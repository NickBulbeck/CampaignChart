const playArea = document.getElementById("playArea");
const chartListDiv = document.getElementById("chartListDiv");
const chartInfoDiv = document.getElementById("chartInfoDiv");
const chartActionList = document.getElementById("chartActionList");
const heading = document.getElementById("titleDiv").getElementsByTagName('H1')[0];
const popupCanvas = document.getElementById("popupCanvas");
let currentChart = null;
let clickTracker = 0;
let todayHasAChart = false;

class Chart {
  constructor(name,munros) {
    this.id = new Date().toString();
    this.name = name || "(chart not named yet)";
    this.munros = munros || [];
    this.munroMeta = 1; // Currently used to increment the Munro id's.
    this.colourScheme = "";
  }
}
class Munro {
  constructor(id,coOrdinates,description,complete,size) {
    this.id = id;
    this.coOrdinates = coOrdinates;
    this.description = description || "";
    this.complete = complete || false;
    this.size = size || "munro";
    this.groupID = null;
  }
}

const setUpScreen = () => {
  chartInfoDiv.style.display='none';
}

const handleTodaysFirstClick = () => {
  if (!currentChart) {
    currentChart = new Chart;
    fillOutChartInfoDiv();
  }
}

const getClickCoordinates = (event) => {
// First, detect where the cursor is
  let cursorX = event.clientX;
  let cursorY = event.clientY;
// next detect where the playArea is - could vary. In practice, the top offset is
// fixed in the CSS at the time of writing, but it'd still be bad form to hardcode it
  let offsets = playArea.getBoundingClientRect();
  let offsetX = offsets.x;
  let offsetY = offsets.top;
// then prevent the drawn triangle overlapping the edge of the playArea
// (only works at the top and the left so far. Also the same correction is applied
// to both munros and tops - that's fine.)
  let munroX = cursorX - offsetX - 40;
  if (munroX < 0) {
    munroX = 0;
  }
  let munroY = cursorY - offsetY - 40;
  if (munroY < 0) {
    munroY = 0;
  }
// stick to whole numbers, for tidiness
  munroX = Math.round(munroX);
  munroY = Math.round(munroY);  
  return [munroX,munroY];
}

const createMunro = (size,coOrdinates) => {
  const id = size + currentChart.munroMeta;
  const munro = new Munro(id,coOrdinates,"",false,size);
  return munro;
}

const calculatePopupPosition = (coOrdinates) => {
  let topX = coOrdinates[0], topY = coOrdinates[1];
  let popupX = 0, popupY = 0;
  if (topY < 300 ) {
    popupY = topY;
  } else {
    popupY = 300; 
  }
  if (topX < 500) {
    popupX = topX + 100;
  } else {
    popupX = topX - 450;
  }
  return [popupX,popupY];
}

const addMunroToCurrentChart = (munro) => {
  currentChart.munroMeta++;
// This increments the key for the next munro to be created, which makes sure every munro has a
// different key regardless of how many are added or deleted. It should probably be done in some
// kind of getter/setter in the class, mind you...
  currentChart.munros.push(munro);
}

const playAreaClick = (event) => {
  if (event.target.id != "playArea") {
    return null;
  } 
  clickTracker++;
  if (clickTracker === 1) {
    singleClickTimer = setTimeout(function() {
      handleTodaysFirstClick();
      const coOrdinates = getClickCoordinates(event);
      const newMunro = createMunro("munro",coOrdinates);
      addMunroToCurrentChart(newMunro);
      drawMunro(newMunro);
      addChartListLine(newMunro);
      clickTracker = 0;
    }, 250);
  } else if (clickTracker === 2) {
    clearTimeout(singleClickTimer);
    handleTodaysFirstClick();
    const coOrdinates = getClickCoordinates(event);
    const newMunro = createMunro("top",coOrdinates);
    addMunroToCurrentChart(newMunro);
    drawMunro(newMunro);
    addChartListLine(newMunro);
    clickTracker = 0;
  }
}

const munroMouseOver = (event) => {
  event.preventDefault();
  // console.log("Hovering over a Munro");
  // const targetRect = event.target.getBoundingClientRect();
  // console.log(targetRect.left.toFixed(),targetRect.x.toFixed());
  // console.log(targetRect.top.toFixed(),targetRect.y.toFixed());
  // console.log("==============================");
}

const topMouseOver = (event) => {
  event.preventDefault();
  // console.log("Hovering over a Top");
  // const targetRect = event.target.getBoundingClientRect();
  // console.log(targetRect.left.toFixed(),targetRect.x.toFixed());
  // console.log(targetRect.top.toFixed(),targetRect.y.toFixed());
  // console.log("==============================");
}



const playAreaRightClick = (event) => {
  event.preventDefault();
  if (!event.target.classList.contains("triangle") ) {
    return null;
  }
  if (!event.target.id) {
    // Effectively disables the right-click for anything that's not a munro/top inner
    return null;
  }
  const target = event.target;
  const selectedTop = currentChart.munros.filter((t) => {
    return t.id === target.id;
  })[0];
  clickTracker++;
  // Initially, right-click added a highlight to both the top and its corresponding list item.
  // This feature is probably not needed at all now I've got the popup functionality working,
  // but I've kept the double-click feature just in case I decide to revive it.
  if (clickTracker === 1) {
    singleClickTimer = setTimeout(function() {
      drawPopup(selectedTop);
      clickTracker = 0;
    }, 1); // was 250 when I had a working double-click
  } else if (clickTracker === 2) {
    clearTimeout(singleClickTimer);
    clickTracker = 0;
  }
}

const drawPopup = (top) => {
// 'top' has an id which, when appended to 'list-', gives the id of an element in the
// info list below the playarea. It also has a groupID that is null.
// get the top's co-ordinates
  const popupPosition = calculatePopupPosition(top.coOrdinates);  
  let popupLeft = popupPosition[0];
  let popupTop = popupPosition[1];
  popupLeft = popupLeft.toString() + "px";
  popupTop = popupTop.toString() + "px";

  const popup = document.createElement('div');
  popup.setAttribute("id","popup");
  popup.setAttribute("fromtop",top.id);
  popup.classList.add("popup");
  popup.style.left = popupLeft;
  popup.style.top = popupTop;

  const descriptionH2 = document.createElement("h2");
  descriptionH2.textContent = top.description;
  descriptionH2.setAttribute("id","descriptionHeading");
  descriptionH2.classList.add("popup__h2");
  popup.appendChild(descriptionH2);

  const munrosSelect = createMunrosSelectList(currentChart.munros,top.id);
  munrosSelect.className = "popup__munrosSelect";
  munrosSelect.addEventListener("change",setTopGroupID,false);
  popup.appendChild(munrosSelect);

  const groupIDPara = document.createElement("p");
  top.groupID? groupIDPara.textContent = top.groupID : groupIDPara.textContent = "(Not added into a group)";
  
  groupIDPara.setAttribute("id","groupIDPara");
  groupIDPara.classList.add("popup__groupIDPara");
  popup.appendChild(groupIDPara);

  const okButton = document.createElement("button");
  okButton.setAttribute("id","popupOKButton");
  okButton.addEventListener("click",clearPopup,false);
  okButton.textContent = "Done";
  okButton.classList.add("popup__OKbutton");
  popup.appendChild(okButton);

  playArea.appendChild(popup);
  popupCanvas.classList.remove("popupCanvas--hidden");  
}

const clearPopup = (event) => {
  event.stopPropagation();
  document.getElementById("popupCanvas").classList.add("popupCanvas--hidden");
  const popup = document.getElementById("popup");
  popup.parentNode.removeChild(popup);
}

const setTopGroupID = (event) => {
  if (event.target.value === "defaultOption") {
    return;
  }
  const groupID = event.target.value;
  const popup = event.target.parentNode;
  const topToAssign = currentChart.munros.filter((t) => {
                      return t.id === popup.getAttribute("fromtop");
  })[0];
  const groupIDPara = document.getElementById("groupIDPara");
  const groupParent = currentChart.munros.filter((t) => {
                      return t.id === groupID;
  })[0];
  groupIDPara.textContent = groupParent.description;
  topToAssign.groupID = groupID;
  data_save(currentChart); // makes sure the groupID change is saved into the current chart
  assignTopToCurrentChartGroup(topToAssign)
  assignTopInChartInfoDiv(topToAssign);
  data_save(currentChart);
}

const assignTopToCurrentChartGroup = (topToAssign) => {
/*  This is called when you right-click a top and assign it to a group, aka parent munro.
    Here, we're moving the topToAssign munro/top object into the right place in the chart.munros array,
    meaning that next time we load the chart, it will automatically be drawn in that place in the chart
    info div (which is rendered li-by-li just going down the list of chart.munros in a for-loop).
*/
// I need to REMOVE topToAssign fae currentChart.munros 
  const j = currentChart.munros.indexOf(
      currentChart.munros.filter((t) => {
          return t.id === topToAssign.id;
        })[0]
  );
  currentChart.munros.splice(j,1);
// Now find the position of the parent munro, and splice in topToAssign immediately after that
  let i = currentChart.munros.indexOf(
      currentChart.munros.filter((t) => {
          return t.id === topToAssign.groupID;
        })[0]
  );
  i++;
  currentChart.munros.splice(i,0,topToAssign);
}

const assignTopInChartInfoDiv = (topToAssign) => {
/*  This is called when you right-click a top and assign it to a group, aka parent munro, just like a
    assignTopToCurrentChartGroup; it places the newly assigned top's corresponding li item in the right place in 
    chartInfoDiv at the time you assign it. 
*/
const parentID = "list-" + topToAssign.groupID;
const weanID = "list-" + topToAssign.id;
const parentLi = document.getElementById(parentID);
const weanLi = document.getElementById(weanID);
parentLi.after(weanLi);
}

const createMunrosSelectList = (munros,notThisYin = null) => {
  const select = document.createElement("select");
  select.setAttribute("id","munrosSelectList");
  let listsize = 1;
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select a parent munro...";
  defaultOption.value = "defaultOption";
  select.appendChild(defaultOption);
  for (let i=0; i < munros.length; i++) {
    if (munros[i].size === "munro" && !(munros[i].id === notThisYin)) {
      listsize++;
      const option = document.createElement("option"); 
      option.textContent = munros[i].description;
      option.value = munros[i].id;
      select.appendChild(option);
      option.addEventListener("mouseover",munroSelectListMouseover,false);
      option.addEventListener("mouseout", munroSelectListMouseout, false);
    }
  }
  if (listsize > 3) {
    listsize = 4;
  };
  select.setAttribute("size",listsize);
  return select;
}

const munroSelectListMouseover = (event) => {
  const listItemToHighlight = document.getElementById("list-" + event.target.value);
  const topToHighlight = document.getElementById(event.target.value);
  listItemToHighlight.classList.add("highlighted");
  topToHighlight.classList.add("highlighted");
}

const munroSelectListMouseout = (event) => {
  const topToUnhighlight = document.getElementById(event.target.value);
  const listItemToUnhighlight = document.getElementById("list-" + event.target.value);
  listItemToUnhighlight.classList.remove("highlighted");
  topToUnhighlight.classList.remove("highlighted");
}

const drawMunro = (munro) => {
// draws a triangle, of size set in triangles.css, centered x and y pixels 
// from the left/top of the playArea div. Munro.size can be 'top' or 'munro'.
// Should probably refactor to replace the word 'top' - this makes sense in 
// the analogous real-life situation, but is used in two ways here and I
// can't change the CSS property name!
  const x = munro.coOrdinates[0].toString() + "px";
  const y = munro.coOrdinates[1].toString() + "px";
  const id = munro.id;
  const size = munro.size;
  let classList = `triangle ${size}-inner`;
  if (munro.complete) {
    classList += ` done`;
  }
  // Start new code here
  const outerDiv = document.createElement("div");
  outerDiv.classList = `outer triangle ${size}`;
  // begin comment: These next two lines aren't working
  outerDiv.style.top = y;
  outerDiv.style.left = x;
  // end comment
  size === "munro" ? outerDiv.addEventListener("mouseenter",munroMouseOver) 
                   : outerDiv.addEventListener("mouseenter",topMouseOver);
  const innerDiv = document.createElement("div");
  innerDiv.classList = classList;
  innerDiv.id = id;
  outerDiv.appendChild(innerDiv);
  playArea.appendChild(outerDiv);
}

const drawChart = (list,colourScheme = "playArea--default") => {
  emptyPlayArea();
  playArea.classList = "playArea " + colourScheme;
  chartActionList.innerHTML = '';
  for (let i=0; i<list.length; i++) {
    const munro = list[i];
    const id = munro.id;
    drawMunro(munro);
    addChartListLine(munro);
  }
  fillOutChartInfoDiv();
}

const addChartListLine = (munro) => {
  let li = document.createElement('li');
  let listLineId = "list-" + munro.id
  li.setAttribute("id",listLineId);
  let desc = munro.description;
  html = `<input type="text" placeholder="Mind and add a description" value="${desc}">
          <button class="saveMunroButton">Save</button>
          <button class="deleteMunroButton">Delete</button>
          <button class="markAsDoneButton">Done</button>`;
  li.innerHTML = html;
  const newInput = li.getElementsByTagName('input')[0];
  newInput.addEventListener('blur',function(event) {
    munro.description = event.target.value;
  },false);
  chartActionList.appendChild(li);
  if (munro.complete) {
    li.querySelector('.deleteMunroButton').style.display = 'none';
    li.querySelector('.markAsDoneButton').disabled = true;
    li.querySelector('.saveMunroButton').style.display = 'none';
    li.getElementsByTagName('INPUT')[0].disabled = true; 
  }
}

const getMunroFromStringID = (id) => {
  const munros = currentChart.munros;
  for (let i=0; i<munros.length; i++) {
    if (munros[i].id === id) {
      return munros[i];
    }
  }
  return null;
}



const emptyPlayArea = () => {
  playArea.innerHTML = '';
//  playArea.appendChild(popup); Not using this yet
}

const emptyChartActionList = () => {
  // provisional - may not use
}

/*****************************************************************************************
Data persistence. So, we have an array of objects, which is searched by something in 
dataAccess.js, which in turn is called from here.
*****************************************************************************************/


const selectExistingChart = (event) => {
  const chartID = event.target.value;
  if (chartID === "Search for an existing chart") {
    return;
  }
  const chart = data_getByID(chartID);
  currentChart = chart;
  document.title = chart.name;
  heading.textContent = chart.name;
  const list = chart.munros;
  drawChart(list,currentChart.colourScheme);
}

const fillOutChartInfoDiv = () => {
  chartInfoDiv.style.display="inherit";
  const nameField = document.getElementById('chartNameInput');
  if (currentChart.name) {
    nameField.value = currentChart.name;
  } else {
    nameField.placeholder = "Mind and name the chart";
  }
}

const chartActionListClick = (event) => {
  listID = event.target.parentNode.id;
  const munroID = listID.replace("list-","");
  const munro = getMunroFromStringID(munroID);
  const action = event.target.className;
  const descriptionField = event.target.parentNode.getElementsByTagName('input')[0];
  const buttons = {
    deleteMunroButton: () => {
      list = currentChart.munros;
      for (let i=0; i<list.length; i++) {
        if (list[i] === munro) {
          list.splice(i,1);
        }
      }
      drawChart(currentChart.munros,currentChart.colourScheme);
      // this will also re-draw the chart action list 
    },
    markAsDoneButton: () => {
      munro.complete = true;
      drawMunro(munro);
      descriptionField.disabled = true;
      event.target.disabled = true;
      event.target.previousElementSibling.style.display = 'none';
      event.target.previousElementSibling.previousElementSibling.style.display = 'none';
    },
    saveMunroButton: () => {
      if (descriptionField.value) {
        munro.description = descriptionField.value;
      }
      data_save(currentChart);
    }
  }
  // The app will work fine without this condition...
  if (event.target.tagName === 'BUTTON') {
    buttons[action]();
  }
  // ... but the condition prevents a console error if the user clicks an element that
  // isn't in the *buttons* object. Just feels a bit tidier.
}

const chartInfoDivClick = (event) => {
  const action = event.target.id;
  const nameField = document.getElementById('chartNameInput');
  const buttons = {
    deleteChartButton: () => {
      data_deleteChart(currentChart);
      currentChart = null;
      loadChartList();
      chartInfoDiv.style.display = 'none';
      chartActionList.innerHTML = '';
      emptyPlayArea();
      // playArea.innerHTML = '';
    },
    saveChartButton: () => {
      currentChart.name = nameField.value;
      heading.textContent = nameField.value;
      document.title = nameField.value;
      data_save(currentChart);
      loadChartList();
    },
    saveAsButton: () => {
      data_save(currentChart);
      const newID = new Date().toString();
      const newName = currentChart.name + " (copy)";
      let newChart = Object.assign({},currentChart);
      newChart.id = newID;
      newChart.name = newName;
      data_save(newChart);
      currentChart = newChart;
      nameField.value = currentChart.name;
      heading.textContent = currentChart.name;
    }
  }
  if (event.target.tagName === 'BUTTON') {
      buttons[action]();
  }
}

const cmndS = (event) => {
  // event.preventDefault();
  if (event.metaKey && event.keycode === 83) {
    console.log("CMD + S");
  }
}

const chartNameInputProcessing = (event) => {
  // may use this later. 
  // which is a stupid reason for creating a function.
}

const newChartButtonClick = (event) => {
  // In case the user clicks the button first of all, when currentChart is null:
  if (currentChart) {
    data_save(currentChart);
  }
  // playArea.innerHTML = '';
  emptyPlayArea();
  chartActionList.innerHTML = '';
  currentChart = null;
  initialiseChartInfoDiv();
}

/**************************************************************************************
 Template/standard charts
***************************************************************************************/

const setTemplateColourScheme = (template) => {
  template = template.toLowerCase();
  template = template.replace(" ","-");
  const colourScheme = "playArea--" + template;
  return colourScheme;
}

const createTemplateChart = (event) => {
  if (currentChart) {
    data_save(currentChart);
  }
  const template = event.target.value;
  if (template === "New chart from template") {
    return;
  }
  currentChart = buildStandardChart(template);
  data_save(currentChart);
  const nameField = document.getElementById('chartNameInput');
  nameField.value = currentChart.name;
  heading.textContent = currentChart.name;
  document.title = "A new day...";
  drawChart(currentChart.munros,currentChart.colourScheme);
// See chart save as button aroon' line 227
}

const buildStandardChart = (template) => {
  const munros = [];
  const descriptions = standardChartDescriptions[template];
  const meta = descriptions.length + 2; // number of munros, plus 1
  for (let i=0; i<descriptions.length; i++) {
    const topOrMunro = descriptions[i][2];
    const k = i + 1;
    const id = topOrMunro + k;
    const desc = descriptions[i][0];
    const coOrdinates = descriptions[i][1];
    munro = new Munro(id,coOrdinates,desc,false,topOrMunro);
    munros.push(munro);
  }
  const chart = new Chart("TEMP ...",munros);
  chart.munroMeta = meta; 
  chart.colourScheme = setTemplateColourScheme(template);
  return chart;
}

const activateProtocolButtonClick = (event) => {
  if (event.target.textContent === "Activate R&R protocol") {
    event.target.textContent = "Confirm";
    const cancelButton = create_cancelButton();
    chartListDiv.appendChild(cancelButton);
    cancelButton.addEventListener("click",cancelButtonClick,false);
  } else {
    currentChart.colourScheme = setTemplateColourScheme("reflect");
    data_save(currentChart);
    drawChart(currentChart.munros,currentChart.colourScheme);
    event.target.textContent = "Activate R&R protocol";
    const cancelButton = document.getElementById("cancelButton");
    event.target.parentNode.removeChild(cancelButton);
  }
  
}

const cancelButtonClick = (event) => {
  const activate = document.getElementById("activateProtocolButton");
  activate.textContent = "Activate R&R protocol";
  event.target.parentNode.removeChild(event.target);
}

/*****************************************************************************************
App setup. So, we have a list of items in chartList that is refreshed 
*****************************************************************************************/
initialiseChartInfoDiv = () => {
  chartInfoDiv.innerHTML = 
    '<p id="chartInfoLabel">About this Campaign Chart:</p>' +
    '<input id="chartNameInput" type="text" name="chartDetails" placeholder="Enter a chart name">' +
    '<button id="saveChartButton">Save changes</button>' +
    '<button id="saveAsButton">Save chart as...</button>' +
    '<button id="deleteChartButton">Delete chart</button>';
}

const create_selectList_existing = () => {
  const todaysChart = detectToday();
  const selectList_existing = document.createElement("select");
  selectList_existing.setAttribute("id","selectFromExisting");
  const chartList = data_getAll();
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Search for an existing chart";
  selectList_existing.appendChild(defaultOption);
  for (let i=0; i<chartList.length; i++) {
    let chartName = chartList[i].name;
    const chartID = chartList[i].id.toString();
    // toString may be belt-and-braces, because I think HTML stringifies it anyway.
    const option = document.createElement("option");
    option.setAttribute("value",chartID);
    if (chartName == todaysChart) {
      chartName += " TODAY";
      todayHasAChart = true;
      currentChart = chartList[i];
      drawChart(chartList[i].munros,chartList[i].colourScheme);
    }
    option.textContent = chartName;
    selectList_existing.appendChild(option);
  }
  return selectList_existing;
}

const create_selectList_standard = () => {
  const selectList_standard = document.createElement("select");
  selectList_standard.setAttribute("id","selectFromTemplates");
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "New chart from template";
  selectList_standard.appendChild(defaultOption);
  templates = Object.keys(standardChartDescriptions);
  for (let i=0; i<templates.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value",templates[i]);
    option.textContent = templates[i];
    selectList_standard.appendChild(option);
  }
  return selectList_standard;
}

const create_activateProtocolButton = () => {
  const activateProtocolButton = document.createElement("button");
  activateProtocolButton.classList.add("r_and_r");
  activateProtocolButton.textContent = "Activate R&R protocol";
  activateProtocolButton.setAttribute("id","activateProtocolButton");
  return activateProtocolButton;
}

const create_cancelButton = () => {
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel");
  cancelButton.textContent = "Cancel";
  cancelButton.setAttribute("id","cancelButton");
  return cancelButton;
}

const loadChartList = () => {

  chartListDiv.innerHTML = '';

  const selectList_existing = create_selectList_existing();
  chartListDiv.appendChild(selectList_existing);

  const newChartButton = document.createElement('button');
  newChartButton.textContent = 'New chart';
  newChartButton.addEventListener('click',newChartButtonClick,false);
  chartListDiv.appendChild(newChartButton);

  const selectList_standard = create_selectList_standard();
  chartListDiv.appendChild(selectList_standard);

  const selectFromExisting = document.getElementById("selectFromExisting");
  selectFromExisting.addEventListener('change',selectExistingChart,false);

  const selectFromTemplates = document.getElementById("selectFromTemplates");
  selectFromTemplates.addEventListener('change',createTemplateChart,false);

  const activateProtocolButton = create_activateProtocolButton();
  chartListDiv.appendChild(activateProtocolButton);
  activateProtocolButton.addEventListener('click',activateProtocolButtonClick,false);

}

/*****************************************************************************************
Today's chart setup. If there is a chart for the current date, display it on load. 
*****************************************************************************************/
const detectToday = () => {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = new Date();
  const todayDD = today.getDate();
  const todayDDD = days[today.getDay()];
  const todayChart = `${todayDDD} ${todayDD}`;
  return todayChart;
}
const inTodaysNews = () => {
  const today = detectToday();
  const chartOptions = (chartListDiv.querySelectorAll('option'));
  chartOptions.forEach(option => {
  // The problem is that this is called unconditionally.
  // We only want to call it on window load, which for some
  // reason isn't working.
    if (option.textContent == today) {
      drawTodaysChart(option.value);
    }
  })
  // see if you can use chartListSelect() with a change event
}
const drawTodaysChart = (chartName) => {
  const event = new Event('change');
  event.target = chartListDiv;
  chartListDiv.value = chartName;
  chartListDiv.dispatchEvent(event);
}
//****************************************************************************************
// The "app" per se starts here.
//****************************************************************************************
setUpScreen();
loadChartList();
// const selectFromExisting = document.getElementById("selectFromExisting");
// selectFromExisting.addEventListener('change',selectExistingChart,false);

// const selectFromTemplates = document.getElementById("selectFromTemplates");
// selectFromTemplates.addEventListener('change',createTemplateChart,false);

playArea.addEventListener('click',playAreaClick,false);
playArea.addEventListener('contextmenu',playAreaRightClick,false);
chartActionList.addEventListener('click',chartActionListClick,false);
chartInfoDiv.addEventListener('click',chartInfoDivClick,false);
// document.addEventListener('keydown',cmndS,false)
// chartNameInput.addEventListener('input',chartNameInputProcessing,false);

document.addEventListener("keydown", function(e) {
  if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
    e.preventDefault();
      if (currentChart) {
        data_save(currentChart);
      }
    }
}, false);

// Detect today's chart, if there is one
inTodaysNews();

