var App = Ember.Application.create({
  rootElement: '#builds-application'
});

App.Router.map(function() {
  this.resource('release', function(){
    this.route('latest');
    this.route('daily');
  });

  this.resource('beta', function(){
    this.route('latest');
    this.route('daily');
  });

  this.resource('canary', function(){
    this.route('latest');
    this.route('daily');
  });

  this.route('tagged');
});

App.CopyClipboardComponent = Ember.Component.extend({
  tagName: 'span',

  didInsertElement: function () {
    var clip = new ZeroClipboard(this.$('button'), {
      // This would normally be a relative path
      moviePath: "/images/ZeroClipboard.swf",

      trustedDomains: ["*"],
      allowScriptAccess: "always"
    });

    clip.on('mousedown', function(client, e) {
      Em.run.later(this, function() {
        $(this).removeClass('loading');
        $(this).removeAttr('disabled');
      }, 1000);
      Em.run.next(this, function() {
        $(this).addClass('loading');
        $(this).attr('disabled', 'disabled');
      });
    });
  }
});

App.S3Bucket = Ember.Object.extend({

  files: [],
  isLoading: false,

  // Setup these as default values.
  // They can be overridden on create.
  useSSL: false,
  delimiter: '/',
  bucket: 'builds.emberjs.com',
  endpoint: 's3.amazonaws.com',

  protocol: function() {
    return this.get('useSSL') ? 'https://' : 'http://';
  }.property('useSSL'),

  hostname: function(){
    // Since the bucket has periods, the s3 wildcard cert won't work. Have to
    // use a subdirectory.
    return (!this.get('bucket')) ? this.get('endpoint') : this.get('endpoint') + '/' + this.get('bucket');
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

  objectBaseUrl: function(){
    return this.get('protocol') + this.get('bucket');
  }.property('protocol', 'bucket'),


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
    baseUrl = this.get('objectBaseUrl');

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
  redirect: function() { this.transitionTo('beta.latest'); }
});

App.BetaLatestRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('currentFilter', '');
    controller.set('model', model);
    this.controllerFor('application').set('selectedProject', '');
  },
  model: function() {
    return App.S3Bucket.create({title: 'Beta Builds', prefix: 'beta/'});
  }
});

App.TabItemController = Ember.ObjectController.extend({
  needs: ['application'],
  isSelectedProject: function() {
    return this.get('model.filter') === this.get('controllers.application.selectedProject');
  }.property('controllers.application.selectedProject')
});

App.ApplicationController = Ember.ObjectController.extend({
  selectedProject: ''
});

App.TabMixin = Ember.Mixin.create({
  init: function() {
    this._super();
    this.set('currentFilter', '');
  },
  needs: ['application'],
  currentFilter: '',
  filters: [{
    name: 'All',
    filter: ''
  }, {
    name: 'Ember.js',
    filter: 'ember.',
  }, {
    name: 'Ember Data',
    filter: 'ember-data.'
  }, {
    name: 'Ember Runtime',
    filter: 'ember-runtime.'
  }],
  filteredFiles: function() {
    var files = this.get('model.files'),
        selectedFilter = this.get('currentFilter');

    return files.filter(function(e) {
      return e.get('name').indexOf(selectedFilter) !== -1;
    });
  }.property('currentFilter'),
  ifFilteredFiles: true,
  actions: {
    setFilter: function(filterName) {
      this.set('currentFilter', filterName);
      this.set('ifFilteredFiles', this.get('filteredFiles').length > 0);
      this.get('controllers.application').set('selectedProject', filterName);
    }
  }
});

App.BetaLatestController = Ember.ObjectController.extend(App.TabMixin);

App.BetaDailyRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('currentFilter', '');
    controller.set('model', model);
    this.controllerFor('application').set('selectedProject', '');
  },
  model: function() {
    return App.S3Bucket.create({
      title: 'Beta Builds',
      delimiter: '',
      prefix: 'beta/daily',
      marker: 'beta/daily/' + moment().subtract('days', 14).format("YYYYMMDD"),
    });
  }
});

App.BetaDailyController = Ember.ObjectController.extend(App.TabMixin);

App.CanaryRoute = Ember.Route.extend({
  redirect: function() { this.transitionTo('canary.latest'); }
});

App.CanaryLatestRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('currentFilter', '');
    controller.set('model', model);
    this.controllerFor('application').set('selectedProject', '');
  },
  model: function() {
    return App.S3Bucket.create({title: 'Canary Builds', prefix: 'canary/' });
  }
});

App.CanaryLatestController = Ember.ObjectController.extend(App.TabMixin);

App.CanaryDailyRoute = Ember.Route.extend(App.TabMixin, {
  setupController: function(controller, model) {
    controller.set('currentFilter', '');
    controller.set('model', model);
    this.controllerFor('application').set('selectedProject', '');
  },
  model: function() {
    return App.S3Bucket.create({
      title: 'Canary Builds',
      delimiter: '',
      prefix: 'canary/daily',
      marker: 'canary/daily/' + moment().subtract('days', 14).format("YYYYMMDD"),
    });
  }
});

App.CanaryDailyController = Ember.ObjectController.extend(App.TabMixin);

App.ReleaseRoute = Ember.Route.extend({
  redirect: function() { this.transitionTo('release.latest'); }
});

App.ReleaseLatestController = Ember.ObjectController.extend(App.TabMixin);

App.ReleaseLatestRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('currentFilter', '');
    controller.set('model', model);
    this.controllerFor('application').set('selectedProject', '');
  },
  model: function() {
    return App.S3Bucket.create({title: 'Release Builds', prefix: 'release/'});
  }
});

App.ReleaseDailyController = Ember.ObjectController.extend(App.TabMixin);

App.ReleaseDailyRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('currentFilter', '');
    controller.set('model', model);
    this.controllerFor('application').set('selectedProject', '');
  },
  model: function() {
    return App.S3Bucket.create({
      title: 'Release Builds',
      delimiter: '',
      prefix: 'release/daily',
      marker: 'release/daily/' + moment().subtract('days', 14).format("YYYYMMDD"),
    });
  }
});

App.TaggedRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('currentFilter', '');
    controller.set('model', model);
    this.controllerFor('application').set('selectedProject', '');
  },
  model: function() {
    var bucket = App.S3Bucket.create({
      title: 'Tagged Release Builds',
      prefix: 'tags/',
      delimiter: '',
    });
    return bucket;
  }
});

App.TaggedController = Ember.ObjectController.extend(App.TabMixin);
/*
 * Handlebars Helpers
 */
Ember.Handlebars.helper('format-bytes', function(bytes){
  return (bytes / 1024).toFixed(2) + ' KB';
});

Ember.Handlebars.helper('format-date-time', function(date) {
  return moment(date).fromNow();
});

