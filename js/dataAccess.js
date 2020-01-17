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
}

const data_getAll = () => {
	let blub = JSON.stringify(dataBase[0])
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

const data_getByID = (id) => {
	if (dataBase[id]) {
		return dataBase[id];
	}
	return null;
}

/* Scaffolding function to seed the database for testing and development purposes
********************************************************************************/

const seedTheDatabase = () => {
	let dummyChart = [
		"Dummy Chart: 2 tasks",
		[
			[100,100],
			[300,300]
		]
	];
	data_save(dummyChart);
	dummyChart = [
		"Dummy Chart: 4 tasks",
		[
			[100,400],
			[200,400],
			[300,400],
			[400,400]
		]
	];
	data_save(dummyChart);
}

seedTheDatabase();