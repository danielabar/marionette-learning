var UserModule = function(settings) {
  var app = settings.app || {},
    initialData = settings.initialData || [];

  var module = {};
  module.app = settings.app || {};

  module.collection = new UsersCollection();

  module.router = new UserRouter({module: module});

  module.controller = new UserController({module: module});

  return module;
};
