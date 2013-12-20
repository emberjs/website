var App = Ember.Application.create({
  rootElement: '#builds-application'
});

App.Router.map(function() {
  this.route('release');
  this.route('beta');
  this.route('canary');
  this.route('tagged');
});

App.CopyClipboardComponent = Ember.Component.extend({
  tagName: 'span',
  hasFlash: ZeroClipboard.detectFlashSupport(),

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

    this.$('input').on('click', function() {
      $(this).select();
    });
  }
});

App.S3Bucket = Ember.Object.extend({
  files: [],
  isLoading: false,

  // Setup these as default values.
  // They can be overridden on create.
  queryUseSSL: true,
  objectUseSSL: false,
  delimiter: '/',
  bucket: 'builds.emberjs.com',
  endpoint: 's3.amazonaws.com',

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

  queryProtocol: function() {
    return this.get('queryUseSSL') ? 'https://' : 'http://';
  }.property('queryUseSSL'),

  queryBaseUrl: function(){
    return this.get('queryProtocol') + this.get('endpoint') + '/' + this.get('bucket')
  }.property('queryProtocol', 'endpoint', 'bucket'),

  objectProtocol: function() {
    return this.get('objectUseSSL') ? 'https://' : 'http://';
  }.property('objectUseSSL'),

  objectBaseUrl: function(){
    return this.get('objectProtocol') + this.get('bucket');
  }.property('objectProtocol', 'bucket'),

  queryParams: function(){
    return this.get('delimiterParameter')  + '&' +
      this.get('markerParameter')     + '&' +
      this.get('maxKeysParameter')    + '&' +
      this.get('prefixParameter');
  }.property('delimiterParameter','markerParameter','maxKeysParameter','prefixParameter'),

  queryUrl: function(){
    return this.get('queryBaseUrl') + '?' + this.get('queryParams');
  }.property('queryBaseUrl','queryParams'),

  filesPresent: function(){
    return this.get('files').length;
  }.property('files.@each'),

  filterFiles: function(filter){
    var files = this.get('files');

    return files.filter(function(e) {
      return e.get('name').indexOf(filter + '.') !== -1;
    });
  },

  load: function(){
    var self = this,
    baseUrl = this.get('objectBaseUrl');

    this.set('isLoading', true);
    Ember.$.get(this.get('queryUrl'), function(data){
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

App.Project = Ember.Object.extend();

App.Project.reopenClass({
  FIXTURES:
    [ {
      projectName: 'Ember',
      projectFilter: 'ember',
      projectRepo: 'emberjs/ember.js',
      channel: "tagged"
    }, {
      projectName: 'Ember Data',
      projectFilter: 'ember-data',
      projectRepo: 'emberjs/data',
      channel: "tagged"
    }, {
      projectName: "Ember",
      projectFilter: "ember",
      projectRepo: 'emberjs/ember.js',
      lastRelease: "1.2.0",
      futureVersion: "1.2.1",
      channel: "release",
      date: "2013-11-23",
      changelogPath: "CHANGELOG"
    }, {
      projectName: "Ember",
      projectFilter: "ember",
      projectRepo: 'emberjs/ember.js',
      lastRelease: "1.3.0-beta.2",
      futureVersion: "1.3.0-beta.3",
      channel: "beta",
      date: "2013-12-08",
      changelogPath: "CHANGELOG.md"
    }, {
      projectName: "Ember Data",
      projectFilter: "ember-data",
      projectRepo: 'emberjs/data',
      lastRelease: "1.0.0-beta.4",
      futureVersion: "1.0.0-beta.5",
      channel: "beta",
      date: "2013-12-19",
      changelogPath: "CHANGELOG.md"
    }, {
      projectName: "Ember",
      projectFilter: "ember",
      projectRepo: 'emberjs/ember.js',
      channel: "canary",
    }, {
      projectName: "Ember Data",
      projectFilter: "ember-data",
      projectRepo: 'emberjs/data',
      channel: "canary",
    }],

  all: function(channel){
    var projects;

    if (channel)
      projects = this.FIXTURES.filterBy('channel', channel);
    else
      projects = this.FIXTURES;

    return projects.map(function(obj) {
      return App.Project.create(obj);
    });
  },

  find: function(channel, name) {
    var allProjects = this.all(channel);

    if (!name)
      return allProjects;
    else
      return allProjects.filterBy('name', name);
  }
});

App.BuildCategoryMixin = Ember.Mixin.create({
  renderTemplate: function() {
    this.render('build-list');
  }
});

App.ApplicationController = Ember.ObjectController.extend({
  isIndexActive: function(){
    return this.isActiveChannel('index');
  }.property('currentRouteName'),

  isTaggedActive: function(){
    return this.isActiveChannel('tagged');
  }.property('currentRouteName'),

  isChannelsActive: function(){
    var self = this;
    return !['index','tagged'].some(function(name){ return name === self.get('currentRouteName'); })
  }.property('currentRouteName'),

  isReleaseActive: function(){
    return this.isActiveChannel('release');
  }.property('currentRouteName'),

  isBetaActive: function(){
    return this.isActiveChannel('beta');
  }.property('currentRouteName'),

  isCanaryActive: function(){
    return this.isActiveChannel('canary');
  }.property('currentRouteName'),

  isActiveChannel: function(channel){
    return this.get('currentRouteName').indexOf(channel) !== -1;
  }
});

App.ProjectsMixin = Ember.Mixin.create({
  projects: function(){
    var projects = App.Project.find(this.get('channel')),
        bucket   = this.get('model'),
        self = this;

    projects.forEach(function(project){
      project.files = bucket.filterFiles(project.projectFilter);
      project.description = self.description(project);
      project.lastReleaseDebugUrl = self.lastReleaseUrl(project.projectFilter, project.channel, project.lastRelease, '.js');
      project.lastReleaseProdUrl  = self.lastReleaseUrl(project.projectFilter, project.channel, project.lastRelease, '.prod.js');
      project.lastReleaseMinUrl   = self.lastReleaseUrl(project.projectFilter, project.channel, project.lastRelease, '.min.js');

      if (project.channel === 'canary')
        project.lastRelease = 'latest';
      else if (project.changelog !== 'false')
        project.lastReleaseChangelogUrl   = 'https://github.com/' + project.projectRepo + '/blob/v' + project.lastRelease + '/' + project.changelogPath;
    });

    return projects;
  }.property('channel', 'model'),

  description: function(project){
    var lastRelease = project.lastRelease,
        futureVersion = project.futureVersion,
        value;

    if (this.get('channel') === 'tagged') {
      value = '';
    } else if (lastRelease) {
      value = 'The builds listed below are incremental improvements made since ' + lastRelease + ' and may become ' + futureVersion + '.'
    } else if (futureVersion) {
      value = 'The builds listed below are not based on a tagged release. Upon the next release cycle they will become ' + futureVersion + '.';
    } else {
      value = 'The builds listed below are based on the most recent development.';
    }

    return new Handlebars.SafeString(value);
  },

  lastReleaseUrl: function(project, channel, lastRelease, extension){
    if (channel === 'canary')
      return 'http://builds.emberjs.com/canary/' + project + extension;
    else
      return 'http://builds.emberjs.com/tags/v' + lastRelease + '/' + project + extension;
  }


});

App.CanaryRoute = Ember.Route.extend(App.BuildCategoryMixin, {
  model: function() {
    return App.S3Bucket.create({title: 'Canary Builds', prefix: 'canary/' });
  }
});

App.CanaryController = Ember.ObjectController.extend(App.ProjectsMixin, { 
  templateName: 'buildList', 
  channel: 'canary'
});

App.BetaRoute = Ember.Route.extend(App.BuildCategoryMixin, {
  model: function() {
    return App.S3Bucket.create({title: 'Beta Builds', prefix: 'beta/'});
  }
});

App.BetaController = Ember.ObjectController.extend(App.ProjectsMixin, {
  templateName: 'buildList',
  channel: 'beta'
});

App.ReleaseRoute = Ember.Route.extend(App.BuildCategoryMixin, {
  model: function() {
    return App.S3Bucket.create({title: 'Release Builds', prefix: 'release/'});
  }
});

App.ReleaseController = Ember.ObjectController.extend(App.ProjectsMixin, {
  templateName: 'buildList',
  channel: 'release'
});

App.TaggedRoute = Ember.Route.extend(App.BuildCategoryMixin, {
  model: function() {
    var bucket = App.S3Bucket.create({
      title: 'Tagged Release Builds',
      prefix: 'tags/',
      delimiter: '',
    });
    return bucket;
  }
});

App.TaggedController = Ember.ObjectController.extend(App.ProjectsMixin, {
  channel: 'tagged'
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

Ember.Handlebars.helper('isHiDPIScreen', function() {
  return window.getDevicePixelRatio() > 1;
});
