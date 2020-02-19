const testLocalStorage = () => {
	// const date = new Date();
	//const foadyb = "foadyb";
	// console.log(date);
	// localStorage.setItem(foadyb,date); - this produced 11:12:45.
	// const foadyb = localStorage.getItem('foadyb');
  
	// console.log(foadyb);
    const foadyb1 = localStorage.getItem('campaignChartApp');
    console.log(foadyb1 + "... is localStorage.getItem");
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
// seedTheDatabase();

 // testLocalStorage();



