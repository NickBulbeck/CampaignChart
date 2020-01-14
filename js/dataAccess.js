//	dataAccess.js holds all the functions that access campaign-chart data.
// It does NOT contain:
//  - any business logic
//  - any data processing [NTS: may have to define 'data-processing' carefully at some future point]
//  - any actual data
//
// HOWEVER: it is tech-specific. It interacts specifically with the data as it is stored 
// in data.js, and does the usual CRUD stuff on it. Actually, it probably just needs to
// read and overwrite at this point.

