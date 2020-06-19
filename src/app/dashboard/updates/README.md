# Updates

## Updates for an owner user

A project owner (Professor) can see a timeline with all the updates from all of it's participants, for a given project.

An update is either an entry from the participant/owner, or it's a pre-existing notification (ie: 'Andrew joined the App')

An update can have comments and reactions to comments.

## Updates for a participant user

[No difference with the owner user for now]

## TODO

- Group updates by day/week, and add timeline item for each day/week
- Search through updates
- Calendar: clickinga date, takes you to that day.
- Add ngx-virtual-scroller

## Grouped Updates

A project can cycle updates by day or by week. Updates have to be retrieved grouped by it's cycle.

A user can only send one update per cycle.

## Grouped Updates in the UI

The grouped updates are the source of data for the timeline, and we expect the heavy lifting to be done in the backend and data coming structured for it's direct usage (tightly coupled).

#### Daily Grouped Updates

The timeline will display empty dates, so we need the API to provide one entry per day, even if it has no updates in it.