(function() {

  var Collection = Backbone.Collection.extend({ });
  var c = new Collection([
    {first: 'joe', last: 'tonks'},
    {first: 'kate', last: 'smith'},
    {first: 'duck', last: 'rogers'},
    {first: 'joe', last: 'foo'}
  ]);
  console.log(c.length);
  console.log(c.models);
  console.log(c.toJSON());

  // Collections get underscore methods attached to them (find, map, etc)
  var found = c.find(function(item) {
    return item.get('first') === 'joe';
  });
  console.log(found.toJSON());

  // Find first model matching criteria
  var found2 = c.findWhere({first: 'joe'});
  console.log(found2.toJSON());

  // Find all matches - returns an Array of models, not an individual model
  var found3 = c.where({first: 'joe'});
  console.dir(found3);
  found3.forEach(function(item) {
    console.log(item.get('first') + ' ' +item.get('last'));
  });
})();
