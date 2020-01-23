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

const data_deleteMunro = (chartID,munroID) => {
	// can't remember how to remove an item from an array!
}

const data_updateMunro = (chartID,munroID,taskDescription) => {
	dataBase[chartID][munroID][2] = taskDescription;
}

/* Scaffolding function to seed the database for testing and development purposes
********************************************************************************/

const seedTheDatabase = () => {
	let dummyChart = [
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

