var HomeController = Marionette.Controller.extend({

  initialize: function(options) {
    this.module = options.module;
  },

  showIndex: function() {
    this.module.app.mainRegion.show(new IndexView());
    this.module.router.navigate('');
  }

});
