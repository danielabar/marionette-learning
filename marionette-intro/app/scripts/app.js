var testData = [
  {id: 1, email: 'test1@test.com'},
  {id: 2, email: 'test2@test.com'},
  {id: 3, email: 'test3@test.com'},
  {id: 4, email: 'test4@test.com'}
];

// App Objects
var UserAdmin = new Marionette.Application();
UserAdmin.addRegions({
  mainRegion: '#app',
  navRegion: '#breadcrumbs'
});

// Initializer
UserAdmin.addInitializer(function() {

  // Internal data
  var crumbs = {
    home: {title: 'Home', trigger: 'index:requested'},
    list: {title: 'User Listing', trigger: 'user:listing:requested'}
  };

  // Instantiate and load the modules
  var breadCrumbs = new BreadCrumbModule(UserAdmin);
  breadCrumbs.load(UserAdmin.navRegion, {title: 'Home'});
  var userModule = new UserModule({app: UserAdmin, initialData: testData});
  var home = new HomeModule({app: UserAdmin});

  // Events
  UserAdmin.on('user:selected', function(user) {
    userModule.controller.showUserDetail(user);
    breadCrumbs.setCrumbs([crumbs.home, crumbs.list, {title: user.get('email')}]);
  });

  UserAdmin.on('user:listing:requested', function() {
    userModule.controller.showUserList();
    breadCrumbs.setCrumbs([crumbs.home, crumbs.list]);
  });

  UserAdmin.on('index:requested', function() {
    home.controller.showIndex();
    breadCrumbs.setCrumbs([crumbs.home]);
  });

  Backbone.history.start();
});

// Start
UserAdmin.start();
