This stage introduces some form of rudimentary data persistence. To begin with,
it's only runtime persistence in a file; next time around, or soon thereafter, it'll
move to being a true database.

DESIGN NOTES

When I launch the app, I can either start a new one, or launch an existing one; this is in place.
What's still missing is a "New chart" button.
Two more added features:
- Double-click creates a Top instead of a Munro
- Enabling a Munro to link to another list

TODAY IS: Thursday

The next challenges include:
- DONE Add delete munro button functionality
- DONE Fix bug whereby a munro marked as done carries over into the next chart
- DONE Add feature whereby a chart with done munros has them drawn as done when it loads
- DONE Fix bug whereby buttons etc aren't disabled when a munro is marked as done
- DONE New Chart functionality, around line 228
- DONE Fix bug whereby deleting a munro (indeed, re-drawing the munros list generally) re-enables the done munros
