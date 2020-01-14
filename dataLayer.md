This stage introduces some form of rudimentary data persistence. To begin with, it's only runtime persistence in a file; next time around,
or soon thereafter, it'll move to being a true database.

DESIGN NOTES

When a set of Munros etc is created, their vital statistics (position so it can be recreated, number/ID and Jira-type details so it can be ticked)
need to be captured. This means there has to be:
- a return button with suitable event-handler on the game area
- a form that's launched to input the name and details of a Munro
- a table/json object that captures all the details of the chart
- another div under the game area that captures the output of the form
- a set of functions that can READ such a table/object and re-create it from a data-source
- we're already partway there, in that the Munros are drawn using a function that
   takes x and y co-ordinates as parameters so that we can easily iterate through
   a list of them read in from outside.

TODAY IS: Tuesday

1) Create a chart object in app.js
2) Create a function in dataAccess that loads it into 