# Next epic: (nothing active just noo)
  Default week
# Story: 
  I want to have a noption in the new from template pull down that says, standard week.
  This then presents you with a noption: when do you want it to start?
  [Some validation on this, perhaps, and also a decision: does it need to be a Monday?]
  [Decision: it does the remaining Mondays in the current month, unless there are none,
   in which case it does next month.]
  Once you pick a Monday, it creates seven daily charts with the right templates and 
  chart names.
  Decisions:
   - Does it check for existing charts with the same name? Yes, because it does 
   something that is not currently a Thing with the app, namely, create a chart-name
   in the background for you. At the moment, you can create a duplicate name, but you
   have to create every name directly.
   - Does it warn, or just delete existing charts? Not sure yet.
  One more thing: the option isn't a daily chart option but a separate button, next to 
  the existing "New chart" yin.
   - What if we want to change the type of a given day in the chart? I think I need to add
  that functionality to the chart info div, next to the "Delete chart" button, because 
  that's a plausible scenario. For instance, a default Saturday is actually a walking day.

  Change chart theme. This is its own story; the idea is that we can create a default week,
  but update one or mair days to be a different type of day. The obvious example is when we
  go walking instead of a default day.
  Clicking the button launches a popup like right-clicking a top. It has a drop-down menu
  of noptions (drawn from the same source as the existing yin) and a "cancel" button.
  When you select a noption, two mair buttons appear: overwrite, and colour only. 
  When you overwrite, it overwrites the chart with the default set of tops. When you go for
  colour only, it changes the background colour without changing any of the tops.

## Approach
  The challenge here is to create and name a chart, then save it. Once that functionality
  is in place, I think the thing to do is to set up an array of 7 charts, and loop through
  it.

## TEMP interim step
  It doesn't matter what order the charts are created in; what matters is the order in which
  they are displayed. So, it's actually the chart list display function that I need to
  alter - that immediately embeds a whole load of functionality.

## Steps





