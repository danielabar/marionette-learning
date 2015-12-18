var BreadCrumbModule = function(app) {

  var module = {};

  var collection = {}; // private

  module.setCrumbs = function(data) {
    collection.reset(data);
  };

  module.load = function(region, initialData) {
    var view;

    initialData = initialData || {};

    collection = new BreadCrumbCollection(initialData);
    collection.on('breadcrumb:selected', function(crumb) {
      app.trigger(crumb.get('trigger'));
    });

    view = new BreadCrumbList({collection: collection});
    region.show(view);
  };

  return module;

  // TODO Figure out where this goes
  // UserAdmin.BreadCrumbs.on('breadcrumb:selected', function(crumb) {
  //   UserAdmin.trigger(crumb.get('trigger'));
  // });

};
