const playArea = document.getElementById("playArea");
const saveButton = document.getElementById("saveButton");
const chartLoadDiv = document.getElementById("chartLoad");
let campaignChart = {
  name: "",
  munroList: []
}
function CampaignChart() {
  this.name = name;
  this.munroList = munroList;
}

const playAreaClick = (event) => {
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
}

const drawMunro = (x,y) => {
// draws a triangle, of size set in triangles.css, centered x and y pixels 
// from the left/top of the playArea div. Then it adds it to campaignChart
  let html = '<div class="triangle munro" style="top:' + y + 'px; left:' + x + 'px">' 
             + '<div class="triangle munro-inner">' + '</div>'
             + '</div>';
  playArea.innerHTML += html;
  let munro = {
    munroX: x,
    munroY: y
  }
  campaignChart.munroList.push(munro);
}




/*****************************************************************************************
Data persistence. So, we have an array of objects, which is searched by something in 
dataAccess.js, which in turn is called from here.
*****************************************************************************************/
const saveButtonClick = (event) => {
  const nameField = document.getElementById('nameField');
  campaignChart.name = nameField.value;
  nameField.value = '';
  data_save(campaignChart);
  // HERE IS THE PROBLEM:
  // campaignChart.name = '';
  // campaignChart.munroList = [];
  // The object is passed by reference, not value, and I've blanked it out here. I need
  // to create a **new object** each time...
  playArea.innerHTML = '';
  loadCharts();
}

const chartLoadClick = (event) => {
  const loadMe = event.target;
  const name = loadMe.textContent;
  const chart = data_getByName(name);
  console.log(chart.munroList);
}

/*****************************************************************************************
App setup. So, we have a list of items in chartLoad that is refreshed 
*****************************************************************************************/
const loadCharts = () => {
  const chartList = data_getAll();
  console.log(`In loadCharts function: length is ${chartList.length} items`);
  console.log(chartList[chartList.length -1]);
  for (let i=0; i<chartList.length; i++) {
    chartName = chartList[i].name;
    chartLoadDiv.innerHTML += `<p>${chartName}</p>`
  }
}

//****************************************************************************************
// The "app" per se starts here.
// loadCharts();
chartLoadDiv.addEventListener('click',chartLoadClick,false);
saveButton.addEventListener('click',saveButtonClick,false);
playArea.addEventListener('click',playAreaClick,false);


