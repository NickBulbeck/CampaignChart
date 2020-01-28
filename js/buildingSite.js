const testLocalStorage = () => {
	const date = new Date();
	//const foadyb = "foadyb";
	console.log(date);
	// localStorage.setItem(foadyb,date); - this produced 11:12:45.
	const foadyb = localStorage.getItem('foadyb');
	console.log(foadyb);
}

testLocalStorage();