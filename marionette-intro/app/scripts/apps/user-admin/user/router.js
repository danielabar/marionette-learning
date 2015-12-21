var UserRouter = Backbone.Router.extend({

  initialize: function(options) {
    this.module = options.module;
  },

  routes: {
    'users': 'showUserList',
    'users/:id': 'showUserDetail',
    'users/:id/edit': 'showUserEditor'
  },

  showUserList: function() {
    this.module.app.trigger('user:listing:requested');
  },

  // this is only called when user editing view is refreshed in browser
  showUserDetail: function(id) {
    this.fetchAndThen(id, function(user) {
      user.select();
    });
  },

  // this is only called when user editing view is refreshed in browser
  showUserEditor: function(id) {
    this.fetchAndThen(id, function(user) {
      user.edit();
    });
  },

  fetchAndThen: function(id, next) {
    var self = this;
    this.module.collection.fetch().then(function() {
      var user = self.module.collection.get(id);
      next(user);
    });
  }

});
