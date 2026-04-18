# Mini-story: (nothing active just noo)


# Next epic: Moving Tops between Munros

What I want: to be able to edit a list in a chart. So, the first gap is the fact that I can't add, say, cablish tasks to the cablish list once I've added a new Munro. I want to be able to put a Munro on the chart, add some tops, and then come back to it later and add others so that they appear under it in the ul.

So, what if, instead of a parent Munro, I frame this
as a group membership named after the root Munro? Then the root Munro has its own id in its
groupID field.
Moreover, if I assign that ID to the group field of another top/munro, I can then insert
the new top/munro immediately after the group parent; or, find the last yin in the ul that
has that group and inset it after that yin (better, because it adds the new yin to the
end of the list, which is probably where I'll want it to go).

So, one question is: what can be part of a group? The answer is, any Munro. You can put a top next to a
Munro in the playArea, right-click it, and get a list of a' the munros. Then you can select one and call 
it the groupId of the new one. 

## Steps
 Create calculatePopupPosition() function                                 DONE
 Call it from when the top is created (createMunro function)              DONE
 Get it to log out the top's co-ordinates in the first instance           DONE
 Then get it to calculate (and log out) the popup's co-ordinates          DONE
 Then store the popup co-ordinates with the top                           DONE

 Update the playAreaRightClick to find the top/munro object   DONE     
 Create drawPopup that creates the popup div element          DONE
 Create OK button that dismisses the popup                    DONE
 Create select list populated with all chart munros           DONE


FIX BUG: calculatePopupPosition() called only on right-click        DONE
FIX BUG: Use array.filter instead of array[i] to call popup?        DONE
 - Create text field with popup top description                     DONE
 - Create text field with current parent munro                      toDo
 - Add event-listener to select options:
    - mouseover to highlight relevant Munro                         toDo
    - mouseout to remove highlight                                  toDo
 - Add event-listener to select itself:
    - change to call setGroupID(munro)                              toDo
 - code setGroupID to:
    - set the GroupID of the new munro                              toDo
    - update the text field in the popup at the same time           toDo
    - 

## Approach

So, the next steps are:
 1) Work out the design (and in particular the size) of the popup.
 2) Work out the popup co-ordinates when the top is drawn.

## Popup design

The main question here is: what size is the popup?
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


