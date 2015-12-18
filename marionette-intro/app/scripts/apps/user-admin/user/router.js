var UserRouter = Backbone.Router.extend({

  initialize: function(options) {
    this.module = options.module;
  },

  routes: {
    'users': 'showUserList',
    'users/:id': 'showUserDetail'
  },

  showUserList: function() {
    this.module.app.trigger('user:listing:requested');
  },

  showUserDetail: function(id) {
    var user = new User({id: id});
    // Debate: Is calling fetch from router a Backbone anti-pattern?
    user.fetch().then(function() {
      user.select();
    });
  }
});
