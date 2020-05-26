This stage introduces some form of rudimentary data persistence. To begin with,
it's only runtime persistence in a file; next time around, or soon thereafter, it'll
move to being a true database.

DESIGN NOTES

When I launch the app, I can either start a new one, or launch an existing one; this is in place.
Two more added features:
- Double-click creates a Top instead of a Munro
- Enabling a Munro to link to another list

TODAY IS: Monday

Immediate ToDo:
- Put some kind of try/catch round dataAccess line 30 for when somehow it's not proper JSON.
- Check what happens to the new chart ID when chart-save-as button is clicked
- Refactor 230 and 263 into a separate function

The next challenges include:
- In the playAreaCLick function fae 38 onwards, detect a double-click.
- When a chartActionsList input is created, add the blur event listener to it so the chart is saved.
