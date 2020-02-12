This stage introduces some form of rudimentary data persistence. To begin with,
it's only runtime persistence in a file; next time around, or soon thereafter, it'll
move to being a true database.

DESIGN NOTES

When I launch the app, I can either start a new one, or launch an existing one. So: I need a pull-down menu.
To start with, the chart app contains a blank input, with a Save button.
If you click on the chart...
If you click on the New button... 
Need these combinations decided.

TODAY IS: Monday

The next challenges include:
- Display the chart name in chartTitle once there's a current chart
- Decide on the chart name-editing approach, with the save button if the munros are updated
- Attach event-listeners to the following munro buttons:
-- munro: edit
-- munro: save
-- munro: delete
-- munro: done
- Attach event-listeners to the following chartTitle buttons:
-- new
-- edit
-- save
-- delete

