const testLocalStorage = () => {
	// const date = new Date();
	//const foadyb = "foadyb";
	// console.log(date);
	// localStorage.setItem(foadyb,date); - this produced 11:12:45.
	// const foadyb = localStorage.getItem('foadyb');
  
	// console.log(foadyb);
  try {
    const foadyb1 = localStorage.getItem('foadyb');
    console.log(foadyb1);
  }
  catch(error) {
    console.log(error + ". foadyb1 doesn't exist, yet at any rate.");
  }
  
}

const testSetupOfChartObject = () => {
  const date = new Date();
  const munro = new Munro;
  // console.log(munro);
}

/* Scaffolding function to seed the database for testing and development purposes
********************************************************************************/

const seedTheDatabase = () => {
  const munro1 = new Munro("id_1",[100,100],"The first test task");
  const munro2 = new Munro("id_2",[300,300],"The second test task");
  const munro3 = new Munro("id_3",[100,400],"The third test task");
  const munro4 = new Munro("id_4",[200,400],"The fourth test task");
  const munro5 = new Munro("id_5",[300,400],"The fifth test task");
  const munro6 = new Munro("id_6",[400,400],"The sixth test task");
  let dummyChart = new Chart [
    "Dummy Chart: 2 tasks",
    [
      [100,100,"First task"],
      [300,300,"Second task"]
    ]
  ];
  data_save(dummyChart);
  dummyChart = [
    "Dummy Chart: 4 tasks",
    [
      [100,400,"First task"],
      [200,400,"Second task"],
      [300,400,"Third task"],
      [400,400,"Fourth task"]
    ]
  ];
  data_save(dummyChart);
}

seedTheDatabase();


// testLocalStorage();

testSetupOfChartObject();