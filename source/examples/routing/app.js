// Model

App.Mailbox = Em.Object.extend();

App.Mailbox.reopenClass({
  find: function(id) {
    if (id) {
      return App.FIXTURES.findBy('id', id);
    } else {
      return App.FIXTURES;
    }
  }
});

// Routes

App.Router.map(function() {
  return this.resource('mailbox', { path: '/:mailbox_id' }, function() {
    return this.resource('mail', { path: '/:message_id' });
  });
});

App.ApplicationRoute = Em.Route.extend({
  model: function() {
    return App.Mailbox.find();
  }
});

App.MailRoute = Em.Route.extend({
  model: function(params) {
    return this.modelFor('mailbox').messages.findBy('id', params.message_id);
  }
});

// Handlebars helper

Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).format('MMM Do');
});
