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
