(function() {

  var User = Backbone.Model.extend({
    url: '/users',
    defaults: {
      first: 'First',
      last: 'Last',
      email: 'test@test.com'
    }
  });

  var Users = Backbone.Collection.extend({
    model: User
  });

  var users = new Users([
    {first: 'joe', last: 'tonks'},
    {first: 'kate', last: 'smith'},
    {first: 'duck', last: 'rogers'},
    {first: 'joe', last: 'foo'}
  ]);

  // console.log(users.toJSON());

  // collection can detect if any of its member models changed
  users.on('change', function(model) {
    console.log(model.toJSON());
  });

  var found = users.findWhere({first: 'kate'});
  found.set('first', 'katechanged');

})();
