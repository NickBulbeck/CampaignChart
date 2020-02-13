const playArea = document.getElementById("playArea");
const chartListDiv = document.getElementById("chartListDiv");
const chartInfoDiv = document.getElementById("chartInfoDiv");
const chartActionList = document.getElementById("chartActionList");
let currentChart = null;
class Chart {
  constructor(id,name,munros) {
    this.id = id;
    this.name = name;
    this.munros = munros || [];
    this.munroMeta = 1;
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
    const key = new Date().toString();
    currentChart.id = key;
// Changes: what if you're just adding to an existing chart? In that case,
// you don't want to update currentChart, but you do want to alter the
// buttons in chartInfoDiv.
    fillOutChartInfoDiv();
  }
}

const playAreaClick = (event) => {
  handleTodaysFirstClick();

// First, detect where the cursor is
  let cursorX = event.clientX;
  let cursorY = event.clientY;
// next detect where the playArea is - could vary. In practice, the top offset is
// fixed in the CSS at the time of writing, but it'd still be bad form to hardcode it
  let offsets = playArea.getBoundingClientRect();
  let offsetX = offsets.x;
  let offsetY = offsets.top;
// then prevent the drawn triangle overlapping the edge of the playArea
// (only works at the top and the left so far)
  let munroX = cursorX - offsetX - 40;
  if (munroX < 0) {
    munroX = 0;
  }
  let munroY = cursorY - offsetY - 40;
  if (munroY < 0) {
    munroY = 0;
  }
  const munroID = "munro" + currentChart.munroMeta;
  const newMunro = new Munro(munroID,[munroX,munroY]);
  currentChart.munroMeta += 1;
  currentChart.munros.push(newMunro);
// This increments the key for the next munro to be created, which makes sure every munro has a
// different key regardless of how many are added or deleted. It should probably be done in some
// kind of getter/setter in the class, mind you...
  drawMunro(newMunro);
  addChartListLine(newMunro);
}

const drawMunro = (munro) => {
// draws a triangle, of size set in triangles.css, centered x and y pixels 
// from the left/top of the playArea div.
  const x = munro.coOrdinates[0];
  const y = munro.coOrdinates[1];
  const id = munro.id;
  let classList = 'triangle munro-inner';
  if (munro.complete) {
    classList += ' done';
  }
  let html = '<div class="triangle munro" style="top:' + y + 'px; left:' + x + 'px">' 
             + '<div class="' + classList + '" id = "' + id + '"></div>'
             + '</div>';
  playArea.innerHTML += html;
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
}

const addChartListLine = (munro) => {
  let li = document.createElement('li');
  li.setAttribute("id",munro.id);
  let desc = munro.description;
  html = `<input type="text" placeholder="Mind and add a description" value="${desc}">
          <button class="saveMunroButton">Save</button>
          <button class="deleteMunroButton">Delete</button>
          <button class="markAsDoneButton">Done</button>`;
  li.innerHTML = html;
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
  
  const chartID = event.target.value;
  const chart = data_getByID(chartID);
  currentChart = chart;
  const list = chart.munros;
  drawChart(list);
  fillOutChartInfoDiv();
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
  const munroID = event.target.parentNode.id;
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
  const editButton = document.getElementById('editChartButton');
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
      console.log("Saving the chart...");
      currentChart.name = nameField.value;
      data_save(currentChart);
      loadChartList();
    }
  }
  if (event.target.tagName === 'BUTTON') {
      buttons[action]();
  }
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
  // Also, initialise chartInfoDiv. This needs a function...
}


/*****************************************************************************************
App setup. So, we have a list of items in chartList that is refreshed 
*****************************************************************************************/
initialiseChartInfoDiv = () => {
  chartInfoDiv.innerHTML = 
    '<p id="chartInfoLabel">About this Campaign Chart:</p>' +
    '<input id="chartNameInput" type="text" name="chartDetails" placeholder="Enter a chart name">' +
    '<button id="saveChartButton">Save changes</button>' +
    '<button id="deleteChartButton">Delete chart</button>';
}

const loadChartList = () => {
  chartListDiv.innerHTML = '';
  const selectList = document.createElement("select");
  const chartList = data_getAll();
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Search for an existing chart";
  selectList.appendChild(defaultOption);
  for (let i=0; i<chartList.length; i++) {
    const chartName = chartList[i].name;
    const chartID = chartList[i].id.toString();
    // toString may be belt-and-braces, because I think HTML stringifies it anyway.
    const option = document.createElement("option");
    option.setAttribute("value",chartID);
    option.textContent = chartName;
    selectList.appendChild(option);
  }
  chartListDiv.appendChild(selectList);
  const newChartButton = document.createElement('button');
  newChartButton.textContent = 'New chart';
  newChartButton.addEventListener('click',newChartButtonClick,false);
  chartListDiv.appendChild(newChartButton);
  /* the New Chart button also goes in this div. It also needs an event listener; 
    the one for the div at the moment is a change event, but this will need to be
    a click event. First thing is to find out how this will affect the existing
    change event - can I have both? Do I need to just add the click listener to the
    new button, and do it within here?
    Anyway: what the button needs to do.
    - clear the playArea
    - set the currentChart to null
    - 

  */
}



/* Scaffolding: seeding the database. */
const seedTheDatabase = () => {
  const munro1 = new Munro("munro1",[100,100],"The first test task");
  const munro2 = new Munro("munro2",[300,300],"The second test task");
  const munro3 = new Munro("munro3",[100,400],"The third test task");
  const munro4 = new Munro("munro4",[200,400],"The fourth test task");
  const munro5 = new Munro("munro5",[300,400],"The fifth test task");
  const munro6 = new Munro("munro6",[400,400],"The sixth test task");
  const munro7 = new Munro("munro1",[100,100],"The first test task");
  const munro8 = new Munro("munro2",[300,300],"The second test task");
  let chartA = new Chart("seedChart1","Refactoring part A (six munros)");
  chartA.munros.push(munro1);
  chartA.munros.push(munro2);
  chartA.munros.push(munro3);
  chartA.munros.push(munro4);
  chartA.munros.push(munro5);
  chartA.munros.push(munro6);
  chartA.munroMeta = 7;
  data_save(chartA);
  let chartB = new Chart("seedChart2","Refactoring part B (two munros)",[munro7,munro8]);
  chartB.munroMeta = 3;
  data_save(chartB);
  // console.log(`Seeded the database: ${dataBase}`);
}
seedTheDatabase();

//****************************************************************************************
// The "app" per se starts here.
setUpScreen();
loadChartList();
chartListDiv.addEventListener('change',chartListSelect,false);
playArea.addEventListener('click',playAreaClick,false);
chartActionList.addEventListener('click',chartActionListClick,false);
chartInfoDiv.addEventListener('click',chartInfoDivClick,false);



