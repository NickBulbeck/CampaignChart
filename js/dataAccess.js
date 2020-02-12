//	dataAccess.js holds all the functions that access campaign-chart data.
// It does NOT contain:
//  - any business logic
//  - any data processing [NTS: may have to define 'data-processing' carefully at some future point]
//  - any actual data
//
// HOWEVER: it is tech-specific. It interacts specifically with the data as it is stored 
// in data.js, and does the usual CRUD stuff on it. Actually, it probably just needs to
// read and overwrite at this point.

const data_save = (campaignChart) => {
	const key = campaignChart.id;
	for (let i=0; i<dataBase.length; i++) {
		if (dataBase[i].id === key) {
			dataBase[i] = campaignChart;
			return 0;
		}
	}
	dataBase.push(campaignChart);
	// console.log(`In data_save: ${dataBase.length}`);
	return 1;
}

const data_getAll = () => {
	// let blub = JSON.stringify(dataBase[0])
	return dataBase;
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
	const key = campaignChart.id;
	for (let i=0; i<dataBase.length; i++) {
		if (dataBase[i].id === key) {
			console.log("In data_deleteChart: " + dataBase.length);
			dataBase.splice(i,1);
			console.log("In data_deleteChart: " + dataBase.length);
			return 1;
		}
	}
	return -1;
}



