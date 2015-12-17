(function() {

  var User = Backbone.Model.extend({

    // server api calls backing the model
    // url: 'http://localhost:3000/users',
    urlRoot: 'http://localhost:3000/users',

    // client side validation rules
    validate: function(atts, opts) {
      if (!(atts.email)) {
        return 'email is required';
      }
    },

    // run whenever a User model is instantiated
    initialize: function() {
      this.on('invalid', function(m) {
        alert(m.validationError);
      });
    }
  });

  var Users = Backbone.Collection.extend({
    url: 'http://localhost:3000/users',
    model: User
  });

  // populate users from api call to server
  var users = new Users();
  users.fetch();

  // define a new User instance and save to server if valid
  // var user = new User({email: 'provided@test.com'});
  // var user = new User();
  // user.save();  // only called if validation passed

  var goodUser = new User({first: 'aaa', last: 'bbb', email: 'aaa.bbb@test.com'});

  console.log(goodUser.id); // undefined because user not yet saved
  console.log(goodUser.isNew()); // true because has not yet been saved

  // goodUser.save(); // calls server POST because its new
  goodUser.save().then(function success() {
    console.log(goodUser.id); // should be id from server
    console.log(goodUser.isNew()); // should be false because user is saved
    goodUser.set('first', 'aaa2');
    goodUser.save(); // should call server PUT to update existing user
    console.log(goodUser.id); // should be same id from server
  });



})();
