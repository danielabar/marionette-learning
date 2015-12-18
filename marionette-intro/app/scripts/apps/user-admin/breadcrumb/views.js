var BreadCrumbView = Marionette.ItemView.extend({
  tagName: 'li',
  template: _.template('<a href="#"><%=title%></a>'),
  events: {
    'click a': 'fireTrigger'
  },
  fireTrigger: function(evt) {
    evt.preventDefault();
    // recall a select function exists on the BreadCrumb model
    // but how do we know that BreadCrumb model is associated with BreadCrumbView???
    this.model.select();
  }
});

var BreadCrumbList = Marionette.CollectionView.extend({
  tagName: 'ol',
  className: 'breadcrumb',
  childView: BreadCrumbView
});
