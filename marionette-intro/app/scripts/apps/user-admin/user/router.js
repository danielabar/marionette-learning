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

  // this is only called when user details view is refreshed in browser
  showUserDetail: function(id) {
    var self = this;

    // Need to fetch entire user collection because this app depends on user events bubbling up to collection for handling
    this.module.collection.fetch().then(function() {
      var user = self.module.collection.get(id);
      self.module.app.trigger('user:selected', user);
    });
  },

  // this is only called when user editing view is refreshed in browser
  showUserEditor: function(id) {
    // Note some code duplication with showUserDetail
    var self = this;

    this.module.collection.fetch().then(function() {
      var user = self.module.collection.get(id);
      self.module.app.trigger('user:editing', user);
    });
  }

});
