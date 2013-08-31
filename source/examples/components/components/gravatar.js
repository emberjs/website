App.GravatarImageComponent = Ember.Component.extend({
  size: 200,
  email: '',

  gravatarUrl: function() {
    var email = this.get('email'),
        size = this.get('size');

    return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
  }.property('email', 'size')
});
