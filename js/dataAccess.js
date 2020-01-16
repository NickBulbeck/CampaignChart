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
	dataBase.push(campaignChart);
	const last = dataBase.length -1;
	const munros = campaignChart.munroList.length;
	console.log(`${dataBase[last].name} added with ${munros} munros, ${last+1} charts.`);
	console.log(dataBase[last].name);
}

const data_getAll = () => {
	console.log(`In data_getAll: first item is ${dataBase[0].name}`);
	return dataBase;
}

const data_getByName = (searchName) => {
	for (let i=0; i<dataBase.length; i++) {
		if (database[i].name.toLowerCase() === searchName.toLowerCase()) {
			return database[i];
		}
	}
	return null;
}