var UserController = Marionette.Controller.extend({

  showUserList: function() {
    var userListView = new UserListView({collection: UserAdmin.Users});
    UserAdmin.mainRegion.show(userListView);
    UserAdmin.UserRouter.navigate('users'); // Update the browser url, this does not actually navigate
  },

  showUserDetail: function(user) {
    var layout = new UserLayoutView({model: user});
    UserAdmin.mainRegion.show(layout);

    layout.summary.show(new UserSummaryView({model: user}));
    layout.detail.show(new UserDetailView({model: user}));
    UserAdmin.UserRouter.navigate('users/' + user.id); // Update the browser url, this does not actually navigate
  }

});
