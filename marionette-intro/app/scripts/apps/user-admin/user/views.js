var UserLayoutView = Marionette.LayoutView.extend({
  template: '#user-layout-template',
  regions: {
    summary: '#summary',
    detail: '#detail'
  }
});

var UserSummaryView = Marionette.ItemView.extend({
  template: '#summary-template'
});

var UserDetailView = Marionette.ItemView.extend({
  template: '#detail-template',
  events: {
    'click #nav-user-edit' : 'showUserEditor'
  },
  showUserEditor: function(evt) {
    evt.preventDefault();
    this.model.edit();
  }
});

var UserItemView = Marionette.ItemView.extend({
  tagName: 'tr',
  template: _.template('<td><a href="#"><%=email%></a></td>'),
  events: {
    'click a' : 'showUserDetail'
  },
  showUserDetail: function(evt) {
    evt.preventDefault();
    this.model.select();
  }
});

var UserListView = Marionette.CollectionView.extend({
  tagName: 'table',
  className: 'table table-striped',
  childView: UserItemView,
  // Marionette provides this:
  onBeforeRender: function() {
    this.$el.append('<h2>User List</h2>');
  }
});

var UserEditorView = Marionette.ItemView.extend({
  template: '#user-editor-template'
});
