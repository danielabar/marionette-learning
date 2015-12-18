Learning Backbone and Marionette with Pluralsight [course](https://app.pluralsight.com/library/courses/marionette-fundamentals/table-of-contents)

### Notes

- Marionette "controllers" aren't really controllers, they're just a place to put rendering logic.
- Backbone is event driven system, better to emit events and have other things such as views to subscribe/react to those events
- Router should not tell controller what to do, use events instead
- Marionette standard to name events separated by colon
- `Marionette.ItemView.extend` must specify a `template`
- `Marionette.CollectionView.extend` must specify a `childView`

### Questions

- Sometimes events are registered on Models, sometimes on Views, which one is best when?
- How to determine which model is associated with a view, especially when collections are involved
- Instructor prefers many levels of indirection, does this get difficult to trace through flow of the app?
