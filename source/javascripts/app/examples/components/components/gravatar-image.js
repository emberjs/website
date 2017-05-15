App.GravatarImageComponent = Ember.Component.extend({
  size: 200,
  email: '',

  gravatarUrl: Ember.computed('email', 'size', function() {
    var email = this.get('email').toLowerCase(),
        size = this.get('size');

    return 'https://www.gravatar.com/avatar/' + md5(email) + '?s=' + size;
  })
});
