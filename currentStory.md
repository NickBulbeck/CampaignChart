# FRIDAY 28th FEBRUARY 2025
Line 459 in app.js added. If it's not working... remove this line!

# Current story: different standard chart colour schemes


# Next epic: Moving Tops between Munros

What I want: to be able to edit a list in a chart. So, the first gap is the fact that I can't add, say, cablish tasks to the cablish list once I've added a new Munro. I want to be able to put a Munro on the chart, add some tops, and then come back to it later and add others so that they appear under it in the ul.

This means the ul has to be two-level. Each Munro needs to ken not only whether it has a 
parent, but whether it has any weans. So, what if, instead of a parent Munro, I frame this
as a group membership named after the root Munro? Then the root Munro has its own id in its
root field. Moreover, if I assign that ID to the group field of another top/munro, I can then
sort the ul in group order. That might be cumbersome, though; so maybe I just want to insert
the new top/munro immediately after the group parent; or, find the last yin in the ul that
has that group and inset it after that yin (better, because it adds the new yin to the
end of the list, which is probably where I'll want it to go).

## Approach

I think this needs a two-level unordered list in the chartList. Each Munro has its own second-level ol and is in turn given its own id, so that a new (or moved) Top can be assigned to the appropriate first-level li in the chartList.

And, of course, the right-menu thing needs to happen, as does the parent Munro data-item for the Top.

## Scribbles

Tasks:
    Refactor "parent" to be "groupID". DONE
    Refactor all three instances of playArea.innerHTML = '' to a removeChild() approach
    PROVISIONAL: Refactor all three instances of chartActionList.innerHTML = '' likewise
Then...

5   Beef up the click locator function to locate a right-click.
6   Creeate a popup div with the various functions in (paper prototype).
7   Get the popup div to appear (could be tricky!).
8   Link it to the chart-save and chartList suites of functions.

BEGIN TEMP
Each munro or top in the chart area is given the id munro1 or top2 (etc). The corresponding list item already has the id of list-munro1 or list-top2 (etc).

So, I need to empty the playArea's innerhtml, because looping through child elements is creating bizzare behaviour. I could re-add the popup container at the start of each call of emptyPlayArea.   

Now: the popup itself. Approach:
    In createMunro(), work out the co-ordinates of the popup, and populate them accordingly.

    Question: how tall/wide is the popup? Well; what fields does it need? To answer that, what do I want to be able to edit about a top?

    Title
    Parent - that's harder than it looks. I need a drop-down menu here, not a text-box.
    Co-ordinates? Do I want some way to move the top and the popup a bit, maybe an up/down/left/right arrow?
    Size?
    Child?

    Also note that the problem with having it as a <form> element is that submitting the form reloads the page. This would be handled by persisting the current state if the rendered stuff were handled by a back-end server, but with a plain javascript app using localstorage, it just refreshes the page. I could probably handle this, in turn, by storing a current-chart or similar state object in local storage; in fact, it would be worth thinking about that anyway.

    Styling the popup:
     - add BEM-style classes in createSkeletonPopup
     - and style them in playArea.css

    Making the popup active:
     - realistically, need to move the popup out of playArea and put them both in a parent div, so that clicking on the popup doesn't trigger the playArea click event (that, or change the handler to detect event.target.classList.includes("popup")).

END TEMP

