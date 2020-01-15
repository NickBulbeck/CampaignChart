const playArea = document.getElementById("playArea");
const saveButton = document.getElementById("saveButton");
let campaignChart = {
  name: "",
  munroList: []
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

const saveButtonClick = (event) => {
  const nameField = document.getElementById('nameField');
  campaignChart.name = nameField.value;
  nameField.value = '';
  data_save(campaignChart);
  campaignChart.name = '';
  campaignChart.munroList = [];
  playArea.innerHTML = '';
}


/*****************************************************************************************
Data persistence. So, we have an array of objects, which is searched by something in 
dataAccess.js, which in turn is called from here.
*****************************************************************************************/



// The "app" per se starts here.
saveButton.addEventListener('click',saveButtonClick,false);
playArea.addEventListener('click',playAreaClick,false);