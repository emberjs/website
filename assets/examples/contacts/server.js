var express = require('express'),
    connect = require('connect');

var app = express.createServer(
  connect.logger(),
  connect.static(__dirname),
  connect.static('..')
);

var guid = 0;

var contacts = [
  {
    guid: ++guid,
    firstName: 'Peter',
    lastName: 'Wagenet',
    phoneNumbers: ['(415) 555-2380']
  },

  {
    guid: ++guid,
    firstName: 'Yehuda',
    lastName: 'Katz',
    phoneNumbers: ['(415) 555-6666']
  },

  {
    guid: ++guid,
    firstName: 'Erik',
    lastName: 'Bryn',
    phoneNumbers: ['(415) 555-2380', '(614) 555-8127']
  },

  {
    guid: ++guid,
    firstName: 'James',
    lastName: 'Rosen',
    phoneNumbers: ['(415) 555-2380']
  },

  {
    guid: ++guid,
    firstName: 'Kara',
    lastName: 'Gates',
    phoneNumbers: ['(207) 555-3141']
  },

  {
    guid: ++guid,
    firstName: 'Dudley',
    lastName: 'Flanders',
    phoneNumbers: ['(415) 555-6789']
  },

  {
    guid: ++guid,
    firstName: 'Tom',
    lastName: 'Dale',
    phoneNumbers: ['(808) 800-8135']
  }
];

app.get('/contacts.json', function(req, res) {
  res.send({contacts: contacts});
});

app.listen(3000);
