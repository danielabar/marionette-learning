// App Objects
var UserAdmin = new Marionette.Application();

UserAdmin.addRegions({
  mainRegion: '#app',
  navRegion: '#breadcrumbs'
});

var crumbs = {
  home: {title: 'Home', trigger: 'index:requested'},
  list: {title: 'User Listing', trigger: 'user:listing:requested'}
};

// Module Loader
UserAdmin.addInitializer(function() {
  UserAdmin.breadCrumbs = new BreadCrumbModule({
    app: UserAdmin,
    region: UserAdmin.navRegion,
    initialData: crumbs.home
  });
  UserAdmin.breadCrumbs.show();
  UserAdmin.user = new UserModule({app: UserAdmin});
  UserAdmin.home = new HomeModule({app: UserAdmin});
});

// User Events
UserAdmin.addInitializer(function() {

  // Events
  UserAdmin.on('user:selected', function(user) {
    UserAdmin.user.controller.showUserDetail(user);
    UserAdmin.breadCrumbs.setCrumbs([crumbs.home, crumbs.list, {title: user.get('fullName')}]);
  });

  UserAdmin.on('user:listing:requested', function() {
    UserAdmin.user.controller.showUserList();
    UserAdmin.breadCrumbs.setCrumbs([crumbs.home, crumbs.list]);
  });

  UserAdmin.on('index:requested', function() {
    UserAdmin.home.controller.showIndex();
    UserAdmin.breadCrumbs.setCrumbs([crumbs.home]);
  });

  Backbone.history.start();
});
