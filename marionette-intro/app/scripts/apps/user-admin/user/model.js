var User = Backbone.Model.extend({

  urlRoot: 'http://localhost:3000/users',

  // validate: function(atts, opts) {
  //   if (!(atts.email)) {
  //     return 'email is required';
  //   }
  // },

  initialize: function() {
    this.on('invalid', function(m) {
      alert(m.validationError);
    });
  },

  select: function() {
    // In Backbone, model events bubble up to collections
    this.trigger('user:selected', this);
  },

  edit: function() {
    // In Backbone, model events bubble up to collections
    // HOWEVER, this only works if the collection has been instantiated and is thus listening to model events
    this.trigger('user:editing', this);
  },

  // computed properties
  parse: function(m) {
    m.fullName = m.first + ' ' + m.last;
    m.gravatrUrl = function(size) {
      return 'http://lorempixel.com/' + size + '/' + size + '/sports/' + m.first;
    };
    return m;
  }

});

var UsersCollection = Backbone.Collection.extend({

  // initialize function gets called when index.js instantiates the collection
  initialize: function(data, options) {
    var self = this;

    this.module = options.module;

    this.on('user:selected', function(model) {
      self.module.app.trigger('user:selected', model);
    });

    this.on('user:editing', function(model) {
      self.module.app.trigger('user:editing', model);
    });
  },

  url: 'http://localhost:3000/users',
  model: User
});
