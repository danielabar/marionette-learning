(function() {

  // Test data, later this will come from server
  var testData = [
    {id: 1, email: 'test1@test.com'},
    {id: 2, email: 'test2@test.com'},
    {id: 3, email: 'test3@test.com'},
    {id: 4, email: 'test4@test.com'}
  ];

  // Create application - name it explicitly!
  var UserAdmin = new Marionette.Application();

  // Use Backbone router (not Marionette)
  var AppRouter = Backbone.Router.extend({
    routes: {
      '' : 'showIndex',
      'users': 'showUserList'
    },
    showIndex: function() {
      UserAdmin.AppController.showIndex();
    },
    showUserList: function() {
      UserAdmin.AppController.showUserList();
    }
  });

  // Create the main view (ItemView is a good default choice), pass jquery selector to template
  var IndexView = Marionette.ItemView.extend({
    template: '#index-template',
    events: {
      'click #nav-users-index' : 'showUserList'
    },
    showUserList: function(evt) {
      evt.preventDefault();
      // pass true option to router to tell it to execute the route handler
      UserAdmin.Router.navigate('users', true);
    }
  });

  // Not really a controller in the MVC sense, its just a Marionette object
  var AppController = Marionette.Controller.extend({

    showIndex: function() {
      // Show the view
      UserAdmin.mainRegion.show(new IndexView());
    },

    showUserList: function() {
      var userListView = new UserListView({collection: new Backbone.Collection(testData)});
      UserAdmin.mainRegion.show(userListView);
    }

  });

  // Define application initialization event - this method can get quite long
  UserAdmin.addInitializer(function() {

    // Tell the app where it should output all the templates and views (aka Regions) via jquery selector
    UserAdmin.addRegions({
      mainRegion: '#app'
    });

    // Initialize the app controller
    UserAdmin.AppController = new AppController();

    // Don't do any rendering here, router will control that
    UserAdmin.Router = new AppRouter();

    // Required when using router
    Backbone.history.start();
  });

  // Define User Item View using an inline template (real app would be more complicated than this)
  var UserItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: _.template('<td><%=email%></td>')
  });

  // Define User List View
  var UserListView = Marionette.CollectionView.extend({
    tagName: 'table',
    className: 'table table-striped',
    childView: UserItemView
  });

  // Every app has start and stop, MUST call start otherwise nothing will show
  UserAdmin.start();

})();
