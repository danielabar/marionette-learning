(function() {

  // App Objects
  var UserAdmin = new Marionette.Application();
  var AppRouter = Backbone.Router.extend({

    // Define the routes
    routes: {
      '' : 'showIndex',
      'users': 'showUserList',
      'users/:id': 'showUserDetail'
    },

    // Define the route handlers
    showIndex: function() {
      UserAdmin.trigger('index:requested');
    },
    showUserList: function() {
      // broken for me on refresh unless I add this hack
      if (!UserAdmin.Users) {
        UserAdmin.Users = new UsersCollection(testData);
      }
      // if url shows /users and user refreshes the page, then this route handler will be called
      UserAdmin.trigger('user:listing:requested');
    },
    showUserDetail: function(id) {
      // broken for me on refresh unless I add this hack
      if (!UserAdmin.Users) {
        UserAdmin.Users = new UsersCollection(testData);
      }
      var user = UserAdmin.Users.get(id);
      user.select();
      // UserAdmin.AppController.showUserDetail(id);
    }
  });
  var AppController = Marionette.Controller.extend({

    showIndex: function() {
      // Show the view
      UserAdmin.mainRegion.show(new IndexView());
    },

    showUserList: function() {
      var userListView = new UserListView({collection: UserAdmin.Users});
      UserAdmin.mainRegion.show(userListView);
      UserAdmin.Router.navigate('users'); // Update the browser url, this does not actually navigate
    },

    showUserDetail: function(user) {
      var layout = new UserLayoutView({model: user});
      UserAdmin.mainRegion.show(layout);

      layout.summary.show(new UserSummaryView({model: user}));
      layout.detail.show(new UserDetailView({model: user}));
      UserAdmin.Router.navigate('users/' + user.id); // Update the browser url, this does not actually navigate
    }

  });

  // Events
  UserAdmin.addInitializer(function() {

    // Events
    UserAdmin.on('user:selected', function(user) {
      UserAdmin.AppController.showUserDetail(user);
    });

    UserAdmin.on('user:listing:requested', function() {
      UserAdmin.AppController.showUserList();
    });

    UserAdmin.on('index:requested', function() {
      UserAdmin.AppController.showIndex();
    });

  });

  // Initializer
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

    // Instantiate users collection
    UserAdmin.Users = new UsersCollection(testData);
  });

  // Data
  var testData = [
    {id: 1, email: 'test1@test.com'},
    {id: 2, email: 'test2@test.com'},
    {id: 3, email: 'test3@test.com'},
    {id: 4, email: 'test4@test.com'}
  ];
  var User = Backbone.Model.extend({
    urlRoot: 'http://localhost:3000/users',
    validate: function(atts, opts) {
      if (!(atts.email)) {
        return 'email is required';
      }
    },
    initialize: function() {
      this.on('invalid', function(m) {
        alert(m.validationError);
      });
    },
    select: function() {
      UserAdmin.trigger('user:selected', this);
    }
  });
  var UsersCollection = Backbone.Collection.extend({
    url: 'http://localhost:3000/users',
    model: User
  });

  // Views
  var IndexView = Marionette.ItemView.extend({
    template: '#index-template',
    events: {
      'click #nav-users-index' : 'showUserList'
    },
    showUserList: function(evt) {
      evt.preventDefault();
      UserAdmin.trigger('user:listing:requested');
    }
  });
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
  var UserItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: _.template('<td><a href="#"><%=email%></a></td>'),
    events: {
      'click a' : 'showUserDetail'
    },
    showUserDetail: function(evt) {
      evt.preventDefault();
      // pass the current user id to the user detail view
      // UserAdmin.AppController.showUserDetail(this.model.id);
      this.model.select();
    }
  });
  var UserListView = Marionette.CollectionView.extend({
    tagName: 'table',
    className: 'table table-striped',
    childView: UserItemView,
    // Marionette provides this:
    onBeforeRender: function() {
      this.$el.append('<h2>User List</h2>');
    }
  });

  // Start
  UserAdmin.start();

})();
