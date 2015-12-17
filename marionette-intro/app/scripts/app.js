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
      'users': 'showUserList',
      'users/:id': 'showUserDetail'
    },
    showIndex: function() {
      UserAdmin.AppController.showIndex();
    },
    showUserList: function() {
      // if url shows /users and user refreshes the page, then this route handler will be called
      UserAdmin.AppController.showUserList();
    },
    showUserDetail: function(id) {
      UserAdmin.AppController.showUserDetail(id);
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
      UserAdmin.AppController.showUserList();
    }
  });

  // Declare a Marionette layout view to contain multiple child views
  var UserLayoutView = Marionette.LayoutView.extend({
    template: '#user-layout-template',
    regions: {
      summary: '#summary',
      detail: '#detail'
    }
  });

  var UserSummaryView = Marionette.ItemView.extend({
    template: '#summary-template'
  });

  var UserDetailView = Marionette.ItemView.extend({
    template: '#detail-template'
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
      UserAdmin.Router.navigate('users'); // Update the browser url, this does not actually navigate
    },

    showUserDetail: function(id) {
      var layout = new UserLayoutView();
      UserAdmin.mainRegion.show(layout);
      layout.summary.show(new UserSummaryView());
      layout.detail.show(new UserDetailView());
      UserAdmin.Router.navigate('users/' + id); // Update the browser url, this does not actually navigate
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
    template: _.template('<td><a href="#"><%=email%></a></td>'),
    events: {
      'click a' : 'showUserDetail'
    },
    showUserDetail: function(evt) {
      evt.preventDefault();
      // pass the current user id to the user detail view
      UserAdmin.AppController.showUserDetail(this.model.id);
    }
  });

  // Define User List View
  var UserListView = Marionette.CollectionView.extend({
    tagName: 'table',
    className: 'table table-striped',
    childView: UserItemView,
    // Marionette provides this:
    onBeforeRender: function() {
      this.$el.append('<h2>User List</h2>');
    }
  });

  // Every app has start and stop, MUST call start otherwise nothing will show
  UserAdmin.start();

})();
