# Marionette Fundamentals

Learning Backbone and Marionette with Pluralsight [course](https://app.pluralsight.com/library/courses/marionette-fundamentals/table-of-contents)

### Notes

- Marionette "controllers" aren't really controllers, they're just a place to put rendering logic.
- Backbone is event driven system, better to emit events and have other things such as views to subscribe/react to those events
- Even though Marionette has a router, its going to be deprecated, use Backbone's router instead
- Router should not tell controller what to do, use events instead
- Marionette standard to name events separated by colon
- `Marionette.ItemView.extend` must specify a `template`
- `Marionette.CollectionView.extend` must specify a `childView`
- app initializer runs when start is called

Marionette collection event has reset/sync event bound so it automatically re-renders when its data changes

### Code Organization

- Create a directory for every _concern_, eg: user, breadcrumb etc.
- By convention, each directory should have an `index.js` file that represents the start of the module
- Even though Marionette has a module system, don't use it
- Use multiple routers, to avoid one big app router

### Computed Properties

When view renders, it takes model that gets passed in and just converts to json.
If there are functions on the model (eg: `getFullName()`), that will not be part of the json.

Backbone solution is to implement the `parse` function on the Backbone Model to add the property.
Then it can be used in a template.

`parse` function on model is executed by Backbone whenever a model is instantiated wiht data.

As an alternate, can also put some code directly in the template, for example to format a date for display:

Instead of:

```html
<td><%=lastUpdated%></td>
```

Use `moment` as a global:

```html
<td><%=moment(lastUpdated, 'YYYYMMDD').fromNow()%></td>
```

### Subviews

Like for regular views, need to create a template, a view, and trigger event to display the sub-view.

### Questions/Issues

- Sometimes events are registered on Models, sometimes on Views, which one is best when?
- How to determine which model is associated with a view, especially when collections are involved
- Instructor prefers many levels of indirection via events, does this get difficult to trace through flow of the app?
- Debate on where to fetch data needed by a view, in router? not answered in course
- Event bubbling from model to collection doesn't seem to work on refresh
