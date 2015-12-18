var HomeModule = function(settings) {

  var module = {};
  module.app = settings.app || {};

  module.controller = new HomeController({module: module});

  module.router = new HomeRouter();

  return module;

};
