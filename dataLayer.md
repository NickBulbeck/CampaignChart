This stage introduces some form of rudimentary data persistence. To begin with,
it's only runtime persistence in a file; next time around, or soon thereafter, it'll
move to being a true database.

DESIGN NOTES

When a set of Munros etc is created, their vital statistics (position so it can be recreated,
number/ID and Jira-type details so it can be ticked)
need to be captured. This means there has to be:
- a return button with suitable event-handler on the game area
- a form that's launched to input the name and details of a Munro
- a table/json object that captures all the details of the chart
- another div under the game area that captures the output of the form
- a set of functions that can READ such a table/object and re-create it from a data-source
- we're already partway there, in that the Munros are drawn using a function that
   takes x and y co-ordinates as parameters so that we can easily iterate through
   a list of them read in from outside.

TODAY IS: Wednesday

The next challenges include:
- 
- Once the Save button is clicked, update the input to a normal <p>
  -- add a Delete button
  -- and an Edit button, which hides the <p> and returns the input
  -- and a Done button that colours the Munro in!
- So, there has to be an id for each Munro that links it to the li in this list.
- There also has to be a design for the data that fits in the local storage string.
- The save to local storage needs to use const JSONstuff = JSON.stringify(data);
- ... and the retrieve needs to use JSON.parse(same data).
- Event-handler for the Save button that does all the above stuff.
- Event-handlers for the Delete, Edit and Done buttons too.
- Oh, and I need to make the playArea respond to double-clicks as well as single.

Next:
Make the app such that you EITHER load an existing chart OR create a new one.

HOW...
1) hide the text field and Save buttons initially
2) Set the current object to null 


WEDNESDAY'S PRIMARY CHALLENGE
- find out how to set up an array within an object constructor
