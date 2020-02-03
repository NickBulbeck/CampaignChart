// data.js is a stand-in for a database, created at the early prototype stage.
// Eventually it should be replaced by a database, but it'll work as a basic tool for
// creating a data layer with properly separated concerns.

let dataBase = [];

/*
  chart:
    chartData:
      id, name, some_other_stuff;
    munroList:
      munro:
        id, size, co-ordinates, description
      munro:
        id, size, co-ordinates, description
      munro:
        id, size, co-ordinates, description
  chart:
    chartData:
      id, name, some_other_stuff;
    munroList:
      munro:
        id, size, co-ordinates, description
      munro:
        id, size, co-ordinates, description
      munro:
        id, size, co-ordinates, description

Remember that a property of an object can be another object. This is probably out of
scope for now, but if we have multi-level charts where a given munro is itself
a campaigh chart, then we have an interesting possibility: the munroList itself contains
a chart. Worth thinking a bit about how this would look.




*/