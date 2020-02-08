const playArea = document.getElementById("playArea");
const saveChart = document.getElementById("saveChart");
const chartListDiv = document.getElementById("chartList");
const chartInfoDiv = document.getElementById("chartInfo");
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
    console.log(currentChart);
    chartInfoDiv.style.display="inherit";
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
  drawMunro(munroX,munroY);
  addChartListLine();
  const id = "munro" + currentChart.munroMeta;
  const newMunro = new Munro(id,[munroX,munroY]);
  currentChart.munroMeta += 1;
// This increments the key for the next munro to be created, which makes sure every munro has a
// different key regardless of how many are added or deleted. It should probably be done in some
// kind of getter/setter in the class, mind you...
}

const drawMunro = (x,y) => {
// draws a triangle, of size set in triangles.css, centered x and y pixels 
// from the left/top of the playArea div. Then it adds it to campaignChart.
  let html = '<div class="triangle munro" style="top:' + y + 'px; left:' + x + 'px">' 
             + '<div class="triangle munro-inner">' + '</div>'
             + '</div>';
  playArea.innerHTML += html;
}

const drawChart = (list) => {
  playArea.innerHTML = '';
  chartActionList.innerHTML = '';
  for (let i=0; i<list.length; i++) {
    const x = list[i].coOrdinates[0];
    const y = list[i].coOrdinates[1];
    drawMunro(x,y);
    addChartListLine();
  }
}

const addChartListLine = () => {
  let li = document.createElement('li');
  // hard-coded stuff to begin with...

  // also this needs refactoring so that the stuff below goes in some kind of div or li that has an identity
  // the same as the Munro's identity. That's how we link the two together.
  html = `<input type="text" placeholder="... and keep it brief!"><button class="saveMunro">Save</button>
          <button class="editMunro">Edit</button><button class="deleteMunro">Delete</button>
          <button class="markAsDone">Done</button>`;
  li.innerHTML = html;
  chartActionList.appendChild(li);
}

/*****************************************************************************************
Data persistence. So, we have an array of objects, which is searched by something in 
dataAccess.js, which in turn is called from here.
*****************************************************************************************/
const saveChartClick = (event) => {
// This needs refactoring to take account of the object nature of the chart. It should persist
// the currentChart to the database - the save function in dataAccess.js will need modifying
// to detect whether it's creating a new one or overwriting an existing one.
  const nameField = document.getElementById('chartNameInput');
  currentChart.name = nameField.value;
  data_save(currentChart);
  loadChartList();
}

const chartListClick = (event) => {
// If there's a current chart, save it - different from handling first click

// This needs refactoring like saveChartClick. It also needs a test for if currentChart;
// if so, it needs to save the current chart 
  const loadMe = event.target;
  const chartID = loadMe.dataset.id;
  console.log(`in chartListClick... chartID: ${chartID}`);
  const chart = data_getByID(chartID);
  const list = chart.munros;
  console.log(`list of munros to draw: ${list}`);
  drawChart(list);
}

const chartActionListClick = (event) => {
  // this isn't yet properly written. It needs to show/hide various buttons and
  // persist or remove data against the munro objects in the chart.
  const target = event.target;
  const text = target.textContent;
  console.log(text);
}

const chartInfoDivClick = (event) => {
  console.log(`Element clicked: ${event.target}`);
}

/*****************************************************************************************
App setup. So, we have a list of items in chartList that is refreshed 
*****************************************************************************************/
const loadChartList = () => {
  chartListDiv.innerHTML = '';
  const chartList = data_getAll();
  for (let i=0; i<chartList.length; i++) {
    const chart_i = chartList[i];
    let html = `<p data-id="${chart_i.id.toString()}">${chartList[i].name}</p>`;
    // toString may be belt-and-braces, because I think HTML stringifies it anyway.
    chartListDiv.innerHTML += html;
  }
}



/* Scaffolding: seeding the database. */
const seedTheDatabase = () => {
  const munro1 = new Munro("id_1",[100,100],"The first test task");
  const munro2 = new Munro("id_2",[300,300],"The second test task");
  const munro3 = new Munro("id_3",[100,400],"The third test task");
  const munro4 = new Munro("id_4",[200,400],"The fourth test task");
  const munro5 = new Munro("id_5",[300,400],"The fifth test task");
  const munro6 = new Munro("id_6",[400,400],"The sixth test task");
  let chartA = new Chart("seedChart1","Refactoring part A");
  chartA.munros.push(munro1);
  chartA.munros.push(munro2);
  chartA.munros.push(munro3);
  chartA.munros.push(munro4);
  data_save(chartA);
  let chartB = new Chart("seedChart2","Refactoring part B",[munro5,munro6]);
  data_save(chartB);
  // console.log(`Seeded the database: ${dataBase}`);
}
seedTheDatabase();

//****************************************************************************************
// The "app" per se starts here.
setUpScreen();
loadChartList();
chartListDiv.addEventListener('click',chartListClick,false);
saveChart.addEventListener('click',saveChartClick,false);
playArea.addEventListener('click',playAreaClick,false);
chartActionList.addEventListener('click',chartActionListClick,false);
chartInfoDiv.addEventListener('click',chartInfoDivClick,false);