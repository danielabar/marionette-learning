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
