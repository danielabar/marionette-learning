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

  showUserDetail: function(id) {
    var self = this,
      user = new User({id: id});

    // Debate: Is calling fetch from router a Backbone anti-pattern?
    user.fetch().then(function() {
      self.module.app.trigger('user:selected', user);
    });
  },

  showUserEditor: function(id) {
    // Note some code duplication with showUserDetail
    var self = this,
      user = new User({id: id});

    user.fetch().then(function() {
      self.module.app.trigger('user:editing', user);
    });
  }
});
