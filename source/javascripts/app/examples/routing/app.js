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
  this.resource('mailbox', { path: '/:mailbox_id' }, function() {
    this.resource('mail', { path: '/:message_id' });
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

App.DateHelper = Ember.Helper.helper(function(date) {
  return moment(date[0]).format('MMM Do');
});
