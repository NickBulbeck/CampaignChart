# FRIDAY 28th FEBRUARY 2025
Line 459 in app.js added. If it's not working... remove this line!

# Current story: different standard charts

In principle, I want to change the "New standard chart" button to a drop-down menu
with working day, devops day and activity day, and blank day. I may need separate
working-day charts for me and Lesley or, more likely, to re-name the standard chart
as "HH working day".

Step 1: Rename standardChart.js to be plural.           DONE
Step 2: Refactor template charts as an array            DONE
Step 3: Create the new charts in the array              DONE
Step 4: Create a function that reads the array          DONE
Step 5: Create a drop-down menu populated by 4          DONE
Step 6: Upgrade buildStandardChart per 6                DONE
Step 7: Debug selectExistingChart at 552                DONE
Step 8: Append chartListSelect to correct element       DONE
Step 9: Create event listener for standard list 403     DONE
Step 10: Debug Save changes and delete chart buttons    -
        loadChartList() function sets innerHTML to an empty string, thereby removing
        all the event listeners. They need to be added in loadChartList, and/or 
        I need to make the removal of all the munro list details more specific, such
        that it only removes the descriptions.

Step 11: Add colour-scheme to munro class               - 


# Next epic: Moving Tops between Munros

What I want: to be able to edit a list in a chart. So, the first gap is the fact that I can't add, say, cablish tasks to the cablish list once I've added a new Munro. I want to be able to put a Munro on the chart, add some tops, and then come back to it later and add others so that they appear under it in the ul.

## Approach

I think this needs a two-level unordered list in the chartList. Each Munro has its own second-level ol and is in turn given its own id, so that a new (or moved) Top can be assigned to the appropriate first-level li in the chartList.

And, of course, the right-menu thing needs to happen, as does the parent Munro data-item for the Top.

## Scribbles

Tasks:
    Add a parent property to the Munro class (and keep the same class for both Munros and Tops). Default it to null. DONE
    Set up id's for each Munro, if not already done (I think it is) DONE
    Add those id's to the chartList ul li, with maybe li- concatenated oan DONE
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

When I refactor the whole thing as an angular app, what's the HTML going to look like? Well, I'll have the elements set up as conditionally-rendered components. None of this hard-coded innerHTML bollux. So although I won't be refactoring exactly this app - I'll write it from scratch, not save_as - it'd be better practice to handle the elements properly.  

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

