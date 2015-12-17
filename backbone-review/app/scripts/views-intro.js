(function() {

  // Define the User Model
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
    }
  });

  // Define the Users Collection
  var Users = Backbone.Collection.extend({
    url: 'http://localhost:3000/users',
    model: User
  });

  // Define the whole view
  var AppView = Backbone.View.extend({
    show: function(childView) {
      this.$el.append(childView.el);
    }
  });

  // Define a collection view
  var UsersView = Backbone.View.extend({
    // create html on the fly and bind view to it
    tagName: 'ul',
    initialize: function() {
      // render this view whenever collecion changes
      this.collection.on('sync', this.render, this);
    },
    render: function() {
      // clear everything out in case render gets called multiple times
      var el = this.$el;
      el.empty();

      this.collection.each(function(item) {
        var userView = new UserView({model: item});
        var rendered = userView.render();
        el.append(rendered);
      });
      return el;
    }
  });

  // Abstraction: define an App object
  var App = {
    init: function() {
      // Instantiate all views and data needed by app
      this.appView = new AppView({el: '#app'});
      this.users = new Users();
    },
    start: function() {
      Backbone.history.start();
      // show users list
      var usersView = new UsersView({collection: this.users});
      this.appView.show(usersView);
      // kick things off
      this.users.fetch();
    }
  };


  // Define a child view
  var UserView = Backbone.View.extend({
    tagName: 'li',
    render: function() {
      this.$el.append(this.model.get('email'));
      return this.$el;
    }
  });

  // init app on dom ready
  $(function() {
    App.init();
    App.start();
  });

})();
