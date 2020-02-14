const testLocalStorage = () => {
	// const date = new Date();
	//const foadyb = "foadyb";
	// console.log(date);
	// localStorage.setItem(foadyb,date); - this produced 11:12:45.
	// const foadyb = localStorage.getItem('foadyb');
  
	// console.log(foadyb);
  try {
    const foadyb1 = localStorage.getItem('campaignChartApp');
    console.log(foadyb1 + "... is localStorage.getItem");
  }
  catch(error) {
    console.log(error + ". foadyb1 doesn't exist, yet at any rate.");
  }
  
}


 // testLocalStorage();



