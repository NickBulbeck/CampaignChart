//	dataAccess.js holds all the functions that access campaign-chart data.
// It does NOT contain:
//  - any business logic
//  - any data processing [NTS: may have to define 'data-processing' carefully at some future point]
//  - any actual data
//
// HOWEVER: it is tech-specific. It interacts specifically with the data in localStorage.

let dataBase = [];

const data_save = (campaignChart) => {
	const key = campaignChart.id;
	for (let i=0; i<dataBase.length; i++) {
		if (dataBase[i].id === key) {
			dataBase[i] = campaignChart;
			data_commit();
			return 0;
		}
	}
	dataBase.push(campaignChart);
	data_commit();
	return 1;
}

const data_getAll = () => {
	// gets the full file from localstorage;
	// stores it in dataBase
	let testDB = JSON.parse(localStorage.getItem('campaignChartApp'));
	console.log(`testDB: ${testDB}`);
	if (testDB[0].id) {
		dataBase = testDB;
		console.log(`retrieved database: `);
		console.log(dataBase[0]);
	} 
	return dataBase;
}

const data_commit = () => {
	// saves dataBase to localstorage
	localStorage.setItem('campaignChartApp',JSON.stringify(dataBase)) // name of the database in localstorage
}

const data_getByName = (searchName) => {
	for (let i=0; i<dataBase.length; i++) {
		if (dataBase[i].name.toLowerCase() === searchName.toLowerCase()) {
			return dataBase[i];
		}
	}
	return null;
}

const data_getByID = (searchID) => {
	for (let i=0; i<dataBase.length; i++) {
		if (dataBase[i].id === searchID) {
			return dataBase[i];
		}
	}
	return null;
}

const data_deleteChart = (campaignChart) => {
	// there's localstorage.removeitem('') with a single keyname. Might work with database[i] as well.
	const key = campaignChart.id;
	for (let i=0; i<dataBase.length; i++) {
		if (dataBase[i].id === key) {
			dataBase.splice(i,1);
			data_commit();
			return 1;
		}
	}
	return -1;
}










