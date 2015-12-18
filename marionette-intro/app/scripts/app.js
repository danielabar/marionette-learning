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
  var BreadCrumbController = Marionette.Controller.extend({
    showHome: function() {
      var crumbs = new Backbone.Collection({title: 'Home'});
      this.renderView(crumbs);
    },
    showUserList: function() {
      var crumbs = new Backbone.Collection([{title: 'Home'}, {title: 'User Listing'}]);
      this.renderView(crumbs);
    },
    renderView: function(crumbs) {
      var breadCrumbView = new BreadCrumbList({collection: crumbs});
      UserAdmin.navRegion.show(breadCrumbView);
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
      UserAdmin.BreadCrumbController.showUserList();
    });

    UserAdmin.on('index:requested', function() {
      UserAdmin.AppController.showIndex();
      UserAdmin.BreadCrumbController.showHome();
    });

  });

  // Initializer
  UserAdmin.addInitializer(function() {

    // Tell the app where it should output all the templates and views (aka Regions) via jquery selector
    UserAdmin.addRegions({
      mainRegion: '#app',
      navRegion: '#breadcrumbs'
    });

    // Inits
    UserAdmin.AppController = new AppController();
    UserAdmin.BreadCrumbController = new BreadCrumbController();
    UserAdmin.Router = new AppRouter();
    Backbone.history.start();
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
  var BreadCrumbCollection = Backbone.Collection.extend({});

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
  var BreadCrumbView = Marionette.ItemView.extend({
    tagName: 'li',
    template: _.template('<%=title%>')
  });
  var BreadCrumbList = Marionette.CollectionView.extend({
    tagName: 'ol',
    className: 'breadcrumb',
    childView: BreadCrumbView
  });

  // Start
  UserAdmin.start();

})();
