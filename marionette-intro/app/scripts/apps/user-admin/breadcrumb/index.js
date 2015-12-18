var BreadCrumbModule = function(settings) {

  var module = {};
  module.app = settings.app || {};

  var initialData = settings.initialData || {};
  var collection = new BreadCrumbCollection(initialData);
  var region = settings.region;
  var view = new BreadCrumbList({collection: collection});

  module.setCrumbs = function(data) {
    collection.reset(data);
  };

  // events
  collection.on('breadcrumb:selected', function(crumb) {
    module.app.trigger(crumb.get('trigger'));
  });

  module.show = function() {
    if (region) {
      region.show(view);
    } else {
      throw new Error('Unable to show breadcrumb with no region specified');
    }
  };

  return module;
};
