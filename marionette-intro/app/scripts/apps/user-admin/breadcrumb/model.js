var BreadCrumb = Backbone.Model.extend({
  select: function() {
    this.trigger('breadcrumb:selected', this);
  }
});

var BreadCrumbCollection = Backbone.Collection.extend({
  model: BreadCrumb
});
