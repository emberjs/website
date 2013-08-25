var Mailbox;

Mailbox = Em.Object.extend();

Mailbox.DATA = [
  {
    name: "Inbox",
    id: "inbox",
    messages: [
      {
        subject: "Welcome to Ember",
        from: "tomster@emberjs.com",
        to: "user@example.com",
        date: new Date(),
        body: "Welcome to Ember. We hope you enjoy your stay"
      }, {
        subject: "Great Ember Resources",
        from: "tomster@emberjs.com",
        to: "user@example.com",
        date: new Date(),
        body: "Have you seen embercasts.com? How about emberaddons.com?"
      }
    ]
  }, {
    name: "Spam",
    id: "spam",
    messages: [
      {
        subject: "You have one the Nigerian lottery!!!111ONEONE",
        from: "419@thereallotteryhonest.ng",
        to: "user@example.com",
        date: new Date(),
        body: "You have ONE the lottery! You only have to send us a small amount of monies to claim your prize"
      }
    ]
  }, {
    name: "Sent Mail",
    id: "sent-mail",
    messages: [
      {
        subject: "Should I use Ember",
        from: "user@example.com",
        to: "tomster@emberjs.com",
        date: new Date(),
        body: "Ember looks pretty good, should I use it?"
      }
    ]
  }
];

Mailbox.reopenClass({
  find: function(name) {
    var result;
    result = name != null ? Mailbox.DATA.findProperty('id', name) : Mailbox.DATA;
    return new Em.RSVP.Promise(function(resolve) {
      return Em.run.later(this, resolve, result, 1000);
    });
  }
});

App.Router.map(function() {
  return this.resource('mailbox', {
    path: '/:id'
  }, function() {
    return this.resource('mail', {
      path: '/:index'
    });
  });
});

App.ApplicationRoute = Em.Route.extend({
  model: function() {
    return Mailbox.find();
  }
});

App.MailboxRoute = Em.Route.extend({
  model: function(params) {
    return Mailbox.find(params.id);
  },
  serialize: function(mailbox) {
    return {
      id: mailbox.id
    };
  }
});

App.MailRoute = Em.Route.extend({
  model: function(params) {
    return this.modelFor('mailbox').messages[params.index];
  },
  serialize: function(mail) {
    return {
      index: this.modelFor('mailbox').messages.indexOf(mail)
    };
  }
});

App.LoadingRoute = Em.Route.extend();

App.IndexView = Em.View.extend({
  classNames: ['index']
});

App.MailboxIndexView = Em.View.extend({
  classNames: ['mailbox-index']
});

App.MailView = Em.View.extend({
  classNames: ['mail']
});

App.LoadingView = Em.View.extend({
  classNames: ['loading']
});

Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).format('MMM Do');
});
