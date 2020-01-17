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

TODAY IS: Friday

1) Refactor the campaignChart into an array
1) Add a chart title to the playArea
1) Populate the chartLoad div with a paragraph tag containing the name of everything in dataBase
1) Add an event hondler that retrieves the chart by name
1) Add a function (called fae above) that loads all the munros fae the chart into playArea
1) Go through the debugging in the browser tutorial (and maybe the one fae the make a website course?)
1) Get the retrieval system, that is already there noo, to actually work!
1) Write the business logic that'll drive the behaviour, now that you know you'll need to instantiate campaignChart objects...

SO: 
You open the app. You want to be able to click stuff and save it... but objects are no good because you can't create an object. So, for now,
re-factor app.js so that campaignChart is just an array, not an object. There's probably a way to JSON-ise it and stringify it in reverse,
but we'll cross that bridge when we come to it.