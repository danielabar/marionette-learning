var HomeRouter = Backbone.Router.extend({

  routes: {
    '' : 'showIndex'
  },

  showIndex: function() {
    UserAdmin.trigger('index:requested');
  }
  
});
