# Current Story: Moving Tops between Munros

What I want: to be able to edit a list in a chart. So, the first gap is the fact that I can't add, say, cablish tasks to the cablish list once I've added a new Munro. I want to be able to put a Munro on the chart, add some tops, and then come back to it later and add others so that they appear under it in the ul.

## Approach

I think this needs a two-level unordered list in the chartList. Each Munro has its own second-level ol and is in turn given its own id, so that a new (or moved) Top can be assigned to the appropriate first-level li in the chartList.

And, of course, the right-menu thing needs to happen, as does the parent Munro data-item for the Top.

## Scribbles

Tasks:
1   Add a parent Munro to the Top class.
2   Come to think of it, add a parent Munro to the Munro class. In fact, keep the same class for both. Default it to null.
3   Set up id's for each Munro, if not already done (I think it is)
4   Add those id's to the chartList ul li, with maybe li- concatenated oan
Then...
5   Beef up the click locator function to locate a right-click
6   Creeate a popup div with the various functions in (paper prototype)
7   Get the popup div to appear (could be tricky!)
8   Link it to the chart-save and chartList suites of functions