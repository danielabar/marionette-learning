(function() {

  var Model = Backbone.Model.extend({
    url: '/users',

    defaults: {
      first: 'Bob',
      last: 'Tonks',
      email: 'bob@bob.com'
    },

    // Validation is only triggerred on save (which happens if url is specified on Model)
    validate: function(attributes, options) {
      if (attributes.first === 'Steve') {
        return 'no steves allowed';
      }
    }
  });

  var good = new Model({ });
  console.log(good.isValid());
  console.log(good.validationError);

  var bad = new Model({ first: 'Steve' });
  console.log(bad.isValid());
  console.log(bad.validationError);

  // model can be bound to event, can specify which property to run for
  bad.on('change:last', function() {
    console.log(bad.isValid());
    console.log(bad.validationError);
  });

  bad.set('first', 'Michael');

})();
