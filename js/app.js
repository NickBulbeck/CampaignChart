const playArea = document.getElementById("playArea");
const chartListDiv = document.getElementById("chartListDiv");
const chartInfoDiv = document.getElementById("chartInfoDiv");
const chartActionList = document.getElementById("chartActionList");
const heading = document.getElementById("titleDiv").getElementsByTagName('H1')[0];
let currentChart = null;
let clickTracker = 0;
class Chart {
  constructor(name,munros) {
    this.id = new Date().toString();
    this.name = name || "(chart not named yet)";
    this.munros = munros || [];
    this.munroMeta = 1; // Currently used to increment the Munro id's.
  }
}
class Munro {
  constructor(id,coOrdinates,description,complete,size) {
    this.id = id;
    this.coOrdinates = coOrdinates;
    this.description = description || "";
    this.complete = complete || false;
    this.size = size || "munro";
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
  return [munroX,munroY];
}

const createMunro = (size,coOrdinates) => {
  const id = size + currentChart.munroMeta;
  const munro = new Munro(id,coOrdinates,"",false,size);
  return munro;
}

const addMunroToCurrentChart = (munro) => {
  currentChart.munroMeta++;
// This increments the key for the next munro to be created, which makes sure every munro has a
// different key regardless of how many are added or deleted. It should probably be done in some
// kind of getter/setter in the class, mind you...
  currentChart.munros.push(munro);
}

const playAreaClick = (event) => {
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
  console.log("Hovering over a Munro");
  const targetRect = event.target.getBoundingClientRect();
  console.log(targetRect.left.toFixed(),targetRect.x.toFixed());
  console.log(targetRect.top.toFixed(),targetRect.y.toFixed());
  console.log("==============================");
}

const topMouseOver = (event) => {
  event.preventDefault();
  console.log("Hovering over a Top");
  const targetRect = event.target.getBoundingClientRect();
  console.log(targetRect.left.toFixed(),targetRect.x.toFixed());
  console.log(targetRect.top.toFixed(),targetRect.y.toFixed());
  console.log("==============================");
}



const playAreaRightClick = (event) => {
  event.preventDefault();
  if (!event.target.classList.contains("triangle")) {
    return null;
  }
  // Try playArea.getElementById() and then 
  // chartActionList.getElementById()
  const target = event.target;
  const id = target.getAttribute("id");
  // This is a bit hard-coded and clunky, but it reflects the style of 
  // element id that the list items are given in addChartListLine().
  const listId = "list-" + id;

  clickTracker++;
  if (clickTracker === 1) {
    singleClickTimer = setTimeout(function() {
      event.target.classList.add("highlighted");
      document.getElementById(listId).classList.add("highlighted");
      clickTracker = 0;
    }, 250);
  } else if (clickTracker === 2) {
    clearTimeout(singleClickTimer);
    event.target.classList.remove("highlighted");
    document.getElementById(listId).classList.remove("highlighted");
    clickTracker = 0;
  }
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
  outerDiv.classList = `triangle ${size}`;
  // begin comment: These next two lines aren't working
  outerDiv.style.top = y;
  outerDiv.style.left = x;
  // end comment
  size === "munro" ? outerDiv.addEventListener("mouseover",munroMouseOver) 
                   : outerDiv.addEventListener("mouseover",topMouseOver);
  const innerDiv = document.createElement("div");
  innerDiv.classList = classList;
  innerDiv.id = id;
  outerDiv.appendChild(innerDiv);
  playArea.appendChild(outerDiv);
  // End new code here
  // let html = `<div class="triangle ${size}" style="top:${y}px; left:${x}px">` 
  //            + `<div class="${classList}" id = "${id}"></div>`
  //            + `</div>`;
  // playArea.innerHTML += html;
}

const drawChart = (list) => {
  playArea.innerHTML = '';
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

/*****************************************************************************************
Data persistence. So, we have an array of objects, which is searched by something in 
dataAccess.js, which in turn is called from here.
*****************************************************************************************/


const chartListSelect = (event) => {
  // console.log("Change event... " + event.target + " " + event.target.value);
  const chartID = event.target.value;
  const chart = data_getByID(chartID);
  currentChart = chart;
  document.title = chart.name;
  heading.textContent = chart.name;
  const list = chart.munros;
  drawChart(list);
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
      drawChart(currentChart.munros)
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
      playArea.innerHTML = '';
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
  playArea.innerHTML = '';
  chartActionList.innerHTML = '';
  currentChart = null;
  initialiseChartInfoDiv();
}

const newStandardChartButtonClick = (event) => {
  // In case the user clicks the button first of all, when currentChart is null:
  if (currentChart) {
    data_save(currentChart);
  }
  currentChart = buildStandardChart();
  data_save(currentChart);
  const nameField = document.getElementById('chartNameInput');
  nameField.value = currentChart.name;
  heading.textContent = currentChart.name;
  document.title = "A new day...";
  drawChart(currentChart.munros);
  // See chart save as button around line 227
}

const buildStandardChart = () => {
  const munros = [];
  const descriptions = standardChartDescriptions;
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
  return chart;
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

const loadChartList = () => {
  const todaysChart = detectToday();
  chartListDiv.innerHTML = '';
  const selectList = document.createElement("select");
  const chartList = data_getAll();
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Search for an existing chart";
  selectList.appendChild(defaultOption);
  for (let i=0; i<chartList.length; i++) {
    let chartName = chartList[i].name;
    const chartID = chartList[i].id.toString();
    // toString may be belt-and-braces, because I think HTML stringifies it anyway.
    const option = document.createElement("option");
    option.setAttribute("value",chartID);
    if (chartName == todaysChart) {
      chartName += " TODAY";
      // currentChart = chartList[i];
      // drawChart(currentChart.munros);
    }
    option.textContent = chartName;
    selectList.appendChild(option);
  }
  chartListDiv.appendChild(selectList);
  const newChartButton = document.createElement('button');
  newChartButton.textContent = 'New chart';
  newChartButton.addEventListener('click',newChartButtonClick,false);
  chartListDiv.appendChild(newChartButton);
  const newStandardChartButton = document.createElement('button');
  newStandardChartButton.textContent = 'New standard chart';
  newStandardChartButton.addEventListener('click',newStandardChartButtonClick,false);
  chartListDiv.appendChild(newStandardChartButton);
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
  console.log(today);
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
  console.log(chartListDiv.value);
  chartListDiv.dispatchEvent(event);
}
//****************************************************************************************
// The "app" per se starts here.
//****************************************************************************************
setUpScreen();
loadChartList();
chartListDiv.addEventListener('change',chartListSelect,false);
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

