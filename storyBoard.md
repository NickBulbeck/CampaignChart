#Story Board

I think I'm going to go with both bugs and features on the same board, since it's the same person actually doing the work.

Possible list of features:
 - Dragable Munros/tops - this is a longer-term thing
 - A way of adding Tops to any Munro, not just the one at the bottom of the chartActionList <ul> element
 - A third dimension, so that right-clicking a Munro (and/or Top?) launches a popup menu
 - replacing local storage with a sqlite database

So: since dragability is a longer-term thing (and potentially VERY complex), that makes for three Stories to work on just noo.

## Story 1: sqlite or other storage

Actually there's two possibilities in my heid; a flat .json file (with json-object parsing like in project 6 fae TreeHoose) AND/OR a sqlite database. Could, for example, use one as a backup of the other. The advantage of the .json file is that it's easy to edit it manually - so, for instance, I can undo tasks marked as done (not currently possible) and move tasks between Munros, albeit with a bit of faffing. In principle I can do this with sqlite too, via some form of sqlite editing app. (Like [this one at sqlitebrowser](https://sqlitebrowser.org). 

## Task 1.1 - data design

A chart has multiple Munros have multiple Tops. From a future POV, each Munro or Top could in principle have a sub-chart. But not multiple sub-charts: it has either none, or one.
Chart: I need to add a "parent" property, being the ID of a Munro/Top, because once a chart is completed, its parent needs marking as complete. Also when I delete a parent Munro/Top, I want to leave the option of either removing the link with the wean chart (which may still be useful in its own right) or deleting the chart as no longer needed. (I don't want orphaned charts, obviously.)
Munro:  ID
        Co-ordinates
        Description
        Size
        Done
        Tasks []
    do NOT record a Munro's parent.

# Story 2: adding Toips to any Munro

Which means that you right-click the Munro in the chart, and a noption appears to add a Top. This means the pop-up menu business that is already underway.

When drawing a Munro or a top, draw the popup menu next to it, but with display:hidden or something.
Use a variation on getCoOrdinates() to work out where to put it.
Then, in the mouseover functions, make it visible.
If it's a Top, add an attribute to link it to a Munro. Then, in the mouseover menu, display a list of all the Munros in the chart and make one selectable.
   - this is provisional, as I still have to consider how to make them draggable and also how to reshuffle the chart list
   - but it's the correct basic approach}


# Story 3: the third dimension

Is an extension of Stories 1 and 2, really, in that it means a Munro or Top needs to have zero or one sub-charts (not more than one, though) as a property. And that property needs to be displayed/editable via the popup menu. Maybe do that next...