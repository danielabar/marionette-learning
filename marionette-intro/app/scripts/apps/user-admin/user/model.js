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
