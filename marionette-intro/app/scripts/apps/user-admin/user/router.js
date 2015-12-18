var UserRouter = Backbone.Router.extend({

  routes: {
    'users': 'showUserList',
    'users/:id': 'showUserDetail'
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
  }
});
