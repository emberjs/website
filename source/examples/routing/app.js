App.Mailbox = Em.Object.extend();

App.Mailbox.reopenClass({
  find: function(name) {
    var result;
    result = name != null ? App.FIXTURES.findProperty('id', name) : App.FIXTURES;

    return new Em.RSVP.Promise(function(resolve) {
      // Simulate the latency of a network request
      return Em.run.later(this, resolve, result, 1000);
    });
  }
});

App.Router.map(function() {
  return this.resource('mailbox', { path: '/:id' }, function() {
    return this.resource('mail', { path: '/:index' });
  });
});

App.ApplicationRoute = Em.Route.extend({
  model: function() {
    return App.Mailbox.find();
  }
});

App.MailboxRoute = Em.Route.extend({
  model: function(params) {
    return App.Mailbox.find(params.id);
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

Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).format('MMM Do');
});
