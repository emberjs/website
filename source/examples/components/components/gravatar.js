App.GravatarImageComponent = Ember.Component.extend({
  gravatarUrl: function() {
    var size = this.get('size');
    if (!size) {
      this.set('size', '200');
    }
    return "http://www.gravatar.com/avatar/" + hex_md5(this.get('email')) + '?s=' + this.get('size');
  }.property('email', 'size')
});
