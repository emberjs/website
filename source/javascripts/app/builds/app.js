var App = Ember.Application.create({
  rootElement: '#builds-application'
});

App.Router.map(function() {
  this.route('release');
  this.route('beta');
  this.route('canary');
  this.route('tagged');
  this.route('daily');
});

App.CopyClipboardComponent = Ember.Component.extend({
  tagName: 'span',

  didInsertElement: function () {
    var clip = new ZeroClipboard(this.$('a'), {
      // This would normally be a relative path
      moviePath: "/images/ZeroClipboard.swf",

      trustedDomains: ["*"],
      allowScriptAccess: "always"
    });
  }
});

App.S3Bucket = Ember.Object.extend({

  files: [],
  isLoading: false,

  protocol: function() {
    return this.get('useSSL') ? 'https://' : 'http://';
  }.property('useSSL'),

  hostname: function(){
    return (!this.get('bucket')) ? this.get('endpoint') : this.get('bucket') + '.' + this.get('endpoint');
  }.property('bucket','endpoint'),

  delimiterParameter: function(){
    var delimiter = this.getWithDefault('delimiter','').toString();
    return (delimiter) ? 'delimiter=' + delimiter : '';
  }.property('delimiter'),

  markerParameter: function(){
    return 'marker=' + this.getWithDefault('marker','').toString();
  }.property('marker'),

  maxKeysParameter: function(){
    return 'max-keys=' + this.getWithDefault('maxKeys','').toString();
  }.property('maxKeys'),

  prefixParameter: function(){
    return 'prefix=' + this.getWithDefault('prefix','').toString();
  }.property('prefix'),

  baseUrl: function(){
    return this.get('protocol') + this.get('hostname');
  }.property('protocol', 'hostname'),

  queryParams: function(){
    return this.get('delimiterParameter')  + '&' +
      this.get('markerParameter')     + '&' +
      this.get('maxKeysParameter')    + '&' +
      this.get('prefixParameter');
  }.property('delimiterParameter','markerParameter','maxKeysParameter','prefixParameter'),

  url: function(){
    return this.get('baseUrl') + '?' + this.get('queryParams');
  }.property('baseUrl','queryParams'),

  filesPresent: function(){
    return this.get('files').length;
  }.property('files.@each'),

  load: function(){
    var self = this,
    baseUrl = this.get('baseUrl');

    this.set('isLoading', true);
    Ember.$.get(this.get('url'), function(data){
      self.set('isLoading', false);
      self.set('response', data);

      var contents = data.getElementsByTagName('Contents'),
      length   = contents.length,
      files    = [];

      for(var i = 0; i < length; i++) {
        var size = contents[i].getElementsByTagName('Size')[0].firstChild.data,
        name = contents[i].getElementsByTagName('Key')[0].firstChild.data,
        lastModified = new Date(contents[i].getElementsByTagName('LastModified')[0].firstChild.data);

        files.push(
          App.S3File.create({
          name: name,
          size: size,
          lastModified: lastModified,
          relativePath: name,
          baseUrl: baseUrl
        })
        );
      }

      self.set('files', files.sort(function(a,b){
        return b.lastModified - a.lastModified;
      }));
    });
  }.observes('queryUrl').on('init')
});

App.S3File = Ember.Object.extend({
  scriptTag: function(){
    var escapedURL = Handlebars.Utils.escapeExpression(this.get('url'));

    return new Handlebars.SafeString('<script src="' + escapedURL + '"></script>').toString();
  }.property('url'),

  url: function(){
    return this.get('baseUrl') + '/' + this.get('relativePath');
  }.property('baseUrl', 'relativePath')
});

App.BetaRoute = Ember.Route.extend({
  model: function() {
    var bucket = App.S3Bucket.create({
      title: 'Latest Beta Builds',
      bucket: 'builds.emberjs.com',
      endpoint: 's3.amazonaws.com',
      prefix: 'beta/',
      delimiter: '/',
      useSSL: false
    });
    return bucket;
  }
});

App.CanaryRoute = Ember.Route.extend({
  model: function() {
    var bucket = App.S3Bucket.create({
      title: 'Latest Canary Builds',
      bucket: 'builds.emberjs.com',
      endpoint: 's3.amazonaws.com',
      prefix: 'latest/',
      delimiter: '/',
      useSSL: false
    });
    return bucket;
  }
});

App.ReleaseRoute = Ember.Route.extend({
  model: function() {
    var bucket = App.S3Bucket.create({
      title: 'Latest Release Builds',
      bucket: 'builds.emberjs.com',
      endpoint: 's3.amazonaws.com',
      prefix: 'stable/',
      delimiter: '/',
      useSSL: false
    });
    return bucket;
  }
});

App.TaggedRoute = Ember.Route.extend({
  model: function() {
    var bucket = App.S3Bucket.create({
      title: 'Tagged Release Builds',
      bucket: 'builds.emberjs.com',
      endpoint: 's3.amazonaws.com',
      prefix: 'tags/',
      delimiter: '',
      useSSL: false
    });
    return bucket;
  }
});

App.DailyRoute = Ember.Route.extend({
  model: function() {
    var bucket = App.S3Bucket.create({
      title: 'Daily Release Builds',
      bucket: 'builds.emberjs.com',
      endpoint: 's3.amazonaws.com',
      prefix: 'daily/',
      delimiter: '',
      marker: 'daily/' + moment().subtract('days', 5).format("YYYYMMDD"),
      useSSL: false
    });
    return bucket;
  }
});

/*
 * Handlebars Helpers
 */
Ember.Handlebars.helper('format-bytes', function(bytes){
  return (bytes / 1024).toFixed(2) + ' KB';
});

Ember.Handlebars.helper('format-date-time', function(date) {
  return moment(date).fromNow();
});

