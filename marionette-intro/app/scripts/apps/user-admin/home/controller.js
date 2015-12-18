var AppController = Marionette.Controller.extend({

  showIndex: function() {
    UserAdmin.mainRegion.show(new IndexView());
    UserAdmin.HomeRouter.navigate('');
  }

});
