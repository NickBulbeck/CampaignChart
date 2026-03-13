# Mini-story: Add an "activate fatigue protocol" button

The button relates to the current chart, so it should go somewhere near the top of 
the screen. I think next to the "new chart from template" drop-down.
 - Add a button next to the drop-down
 - And for goodness sake add a bit of styling
 - Add an event listener that does the following:
  - If the text is "activate fatigue protocol":
    - Change the text to "Confirm?"
    - Create a "Cancel" button next to it
    - Add a second even listener to the Cancel button
  - Else
    - Changes currentChart.colourScheme to "reflect"
    - Saves current chart
 - Add the Cancel event-listener that
  - changes the text back to "activate fatigue protocol"
  - removes the Cancel button

# Next epic: Moving Tops between Munros

What I want: to be able to edit a list in a chart. So, the first gap is the fact that I can't add, say, cablish tasks to the cablish list once I've added a new Munro. I want to be able to put a Munro on the chart, add some tops, and then come back to it later and add others so that they appear under it in the ul.

So, what if, instead of a parent Munro, I frame this
as a group membership named after the root Munro? Then the root Munro has its own id in its
groupID field.
Moreover, if I assign that ID to the group field of another top/munro, I can then insert
the new top/munro immediately after the group parent; or, find the last yin in the ul that
has that group and inset it after that yin (better, because it adds the new yin to the
end of the list, which is probably where I'll want it to go).

## Approach

 - Each top has a new field: popupPosition. This is a pair of co-ordinates.
 - When I first draw the top, I work out - based on where it is - what its popupPosition
    should be.
 - When it is right-clicked, the options popup is drawn from those co-ordinates.

So, the next steps are:
 1) Work out the design (and in particular the size) of the popup.
 2) Work out the popup co-ordinates when the top is drawn.

## Popup design

It has:
 - The description, which is the main information I'll know it by
 - The hard bit: an editable pull-down menu of all the groups it could be linked to
 - Also important: an overlay that it sits in and that disables the rest of the chart
 - An OK or Save and close button

## Popup co-ordinates

The play area is 1000 wide and 600 high. With the typical browser width I can
overlap right or left by up to 200, but only by 50 above or below. The right-clicked top
itself should not be obscured by the popup.
If the popup is to the RHS of the screen - so, a left of > 500 - the popup goes to its left;
otherwise it goes to its right.
If the popup is in the upper half of the screen - so, a top of < 300 - the popup goes level with it; otherwise it's more complicated. I think it's that if the bottom would be more than 
650, it's re-adjusted to 650.


