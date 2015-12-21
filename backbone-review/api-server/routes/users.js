var express = require('express');
var router = express.Router();
var _ = require('underscore');
var uuid = require('node-uuid');
var moment = require('moment');

// Simple in-memory representation
var usersList = [
  {
    "id" : '1',
    "userName": 'jschmoe',
    "first" : "Joe",
    "last" : "Schmoe",
    "email" : 'joe.schmoe@test.com',
    "lastUpdated": moment().subtract(6, 'days').format('YYYYMMDD')
  },
  {
    "id" : '2',
    "userName": 'jsmith',
    "first" : "Jane",
    "last" : "Smith",
    "email" : 'jane.smith@test.com',
    "lastUpdated": moment().subtract(4, 'days').format('YYYYMMDD')
  },
  {
    "id" : '3',
    "userName": 'bjones',
    "first" : "Bob",
    "last" : "Jones",
    "email" : 'bob.jones@test.com',
    "lastUpdated": moment().subtract(3, 'days').format('YYYYMMDD')
  }
];

router.get('/', function(req, res) {
  res.send(usersList);
});

// 1 second delay to test UI loading indicator
router.get('/:id', function(req, res) {
  setTimeout(function() {
    var userId = req.params.id;
    var matchingUser = _.find(usersList, function(user) {
      return userId === user.id;
    });
    if (matchingUser) {
      res.send(matchingUser);
    } else {
      res.send(404, {error: {message: 'We did not find a user with id: ' + req.params.id } });
    }
  }, 1000);

});

router.post('/', function(req, res) {
  if (!req.body.email) {
    res.send(400, {error: {message: 'Email is required to create a new user.'} });
    return;
  }

  var created = {
    id: uuid.v4(),
    userName: req.body.userName,
    email: req.body.email,
    first: req.body.first,
    last: req.body.last,
    lastUpdated: moment().format('YYYYMMDD')
  };
  usersList.push(created);

  res.status(201).send(created);
});

router.put('/:id', function(req, res) {
  var userId = req.params.id;
  var matchingUser;

  if (!req.body.email) {
    res.send(400, {error: {message: 'Email is required'} });
    return;
  }

  for (var i=0; i<usersList.length; i++) {
    if (usersList[i].id === userId) {
      matchingUser = usersList[i];
      matchingUser.userName = req.body.userName;
      matchingUser.email = req.body.email;
      matchingUser.first = req.body.first;
      matchingUser.last = req.body.last;
    }
  }

  if (matchingUser) {
    res.send(matchingUser);
  } else {
    // res.send(404, {error: {message: 'We did not find a user with id: ' + req.params.id } });
    res.status(404).send({error: {message: 'We did not find a user with id: ' + req.params.id } });
  }
});

module.exports = router;
