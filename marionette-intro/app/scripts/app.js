// App Objects
var UserAdmin = new Marionette.Application();
UserAdmin.addRegions({
  mainRegion: '#app',
  navRegion: '#breadcrumbs'
});

// Events
UserAdmin.addInitializer(function() {

  // Internal data
  var crumbs = {
    home: {title: 'Home', trigger: 'index:requested'},
    list: {title: 'User Listing', trigger: 'user:listing:requested'}
  };

  // Instantiate and load the breadcrumbs module
  var breadCrumbs = new BreadCrumbModule(UserAdmin);
  breadCrumbs.load(UserAdmin.navRegion, {title: 'Home'});

  // Events
  UserAdmin.on('user:selected', function(user) {
    UserAdmin.UserController.showUserDetail(user);
    breadCrumbs.setCrumbs([crumbs.home, crumbs.list, {title: user.get('email')}]);
  });

  UserAdmin.on('user:listing:requested', function() {
    UserAdmin.UserController.showUserList();
    breadCrumbs.setCrumbs([crumbs.home, crumbs.list]);
  });

  UserAdmin.on('index:requested', function() {
    UserAdmin.AppController.showIndex();
    breadCrumbs.setCrumbs([crumbs.home]);
  });

});

// Initializer
UserAdmin.addInitializer(function() {

  // Inits
  UserAdmin.AppController = new AppController();
  UserAdmin.UserController = new UserController();
  UserAdmin.UserRouter = new UserRouter();
  UserAdmin.HomeRouter = new HomeRouter();
  UserAdmin.Users = new UsersCollection(testData);

  // Start
  Backbone.history.start();
});

// Start
UserAdmin.start();
