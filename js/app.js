const playArea = document.getElementById("playArea");
const saveChart = document.getElementById("saveChart");
const chartListDiv = document.getElementById("chartList");
const chartInfoDiv = document.getElementById("chartInfo");
const chartActionList = document.getElementById("chartActionList");
let campaignChart = [];
let munroList = [];
let newChart = true;

const setUpScreen = () => {
  chartInfoDiv.style.display='none';
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
  let munro = [x,y];
  munroList.push(munro);
  addChartListLine();
}

const drawChart = (list) => {
  playArea.innerHTML = '';
  chartActionList.innerHTML = '';
  for (let i=0; i<list.length; i++) {
    const x = list[i][0];
    const y = list[i][1];
    drawMunro(x,y);
  }
}

const addChartListLine = () => {
  let li = document.createElement('li');
  // hard-coded stuff to begin with...
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
  const nameField = document.getElementById('nameField');
  campaignChart.push(nameField.value);
  nameField.value = '';
  campaignChart.push(munroList);
  data_save(campaignChart);
  playArea.innerHTML = '';
  chartActionList.innerHTML = '';
  campaignChart = [];
  munroList = [];
  loadChartList();
}

const chartListClick = (event) => {
  const loadMe = event.target;
  const chartID = parseInt(loadMe.dataset.id);
  console.log(`chartID: ${chartID}`);
  const chart = data_getByID(chartID);
  const list = chart[1];
  drawChart(list);
}

const chartActionListClick = (event) => {
  const target = event.target;
  const text = target.textContent;
  console.log(text);
}

/*****************************************************************************************
App setup. So, we have a list of items in chartList that is refreshed 
*****************************************************************************************/
const loadChartList = () => {
  chartListDiv.innerHTML = '';
  const chartList = data_getAll();
  for (let i=0; i<chartList.length; i++) {
    let html = `<p data-id="${i}">${chartList[i][0]}</p>`;
    chartListDiv.innerHTML += html;
  }
}

//****************************************************************************************
// The "app" per se starts here.
setUpScreen();
loadChartList();
chartListDiv.addEventListener('click',chartListClick,false);
saveChart.addEventListener('click',saveChartClick,false);
playArea.addEventListener('click',playAreaClick,false);
chartActionList.addEventListener('click',chartActionListClick,false);


