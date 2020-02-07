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
********************************************************************************

const seedTheDatabase = () => {
  const munro1 = new Munro("id_1",[100,100],"The first test task");
  const munro2 = new Munro("id_2",[300,300],"The second test task");
  const munro3 = new Munro("id_3",[100,400],"The third test task");
  const munro4 = new Munro("id_4",[200,400],"The fourth test task");
  const munro5 = new Munro("id_5",[300,400],"The fifth test task");
  const munro6 = new Munro("id_6",[400,400],"The sixth test task");
  let chartA = new Chart("seedChart1","Refactoring part A");
  chartA.munros.push(munro1);
  chartA.munros.push([munro2,munro3,munro4]);
  data_save(chartA);
  let chartB = new Chart("seedChart2","Refactoring part B",[munro5,munro6]);
  data_save(chartB);
  console.log(`Seeded the database: ${dataBase}`);
}

seedTheDatabase();
*/

// testLocalStorage();

// testSetupOfChartObject();


