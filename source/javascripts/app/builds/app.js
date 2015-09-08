//= require_tree ./templates

var App = Ember.Application.create({
  rootElement: '#builds-application'
});

App.Router.map(function() {
  this.route('release');
  this.route('beta');
  this.route('canary');
  this.route('tagged');
});

App.Router.reopen({
  notifyGoogleAnalytics: Ember.on('didTransition', function() {
    var url = this.get('url');

    // Add a slash if neccesary
    if (!/^\//.test(url)){ url = '/' + url; }

    _gaq.push(['_trackPageview', '/builds' + url]);
  })
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

  delimiterParameter: Ember.computed('delimiter', function(){
    var delimiter = this.getWithDefault('delimiter','').toString();
    return (delimiter) ? 'delimiter=' + delimiter : '';
  }),

  maxKeysParameter: Ember.computed('maxKeys', function(){
    return 'max-keys=' + this.getWithDefault('maxKeys','').toString();
  }),

  prefixParameter: Ember.computed('prefix', function(){
    return 'prefix=' + this.getWithDefault('prefix','').toString();
  }),

  queryProtocol: Ember.computed('queryUseSSL', function() {
    return this.get('queryUseSSL') ? 'https://' : 'http://';
  }),

  queryBaseUrl: Ember.computed('queryProtocol', 'endpoint', 'bucket', function(){
    return this.get('queryProtocol') + this.get('endpoint') + '/' + this.get('bucket')
  }),

  objectProtocol: Ember.computed('objectUseSSL', function() {
    return this.get('objectUseSSL') ? 'https://' : 'http://';
  }),

  objectBaseUrl: Ember.computed('objectProtocol', 'bucket', function(){
    return this.get('objectProtocol') + this.get('bucket');
  }),

  queryParams: Ember.computed('delimiterParameter', 'maxKeysParameter', 'prefixParameter', function(){
    return this.get('delimiterParameter')  + '&' +
      this.get('maxKeysParameter')    + '&' +
      this.get('prefixParameter');
  }),

  queryUrl: Ember.computed('queryBaseUrl', 'queryParams', function(){
    return this.get('queryBaseUrl') + '?' + this.get('queryParams');
  }),

  filesPresent: Ember.computed('files.[]', function(){
    return this.get('files').length;
  }),

  filterFiles: function(filter, ignoreFiles){
    var files = this.get('files');
    var ignoreFiles = Ember.A(ignoreFiles);

    return files.filter(function(e) {
      var name = e.get('name');
      var ignored = ignoreFiles.any(function(f) { return name.indexOf(f) >= 0; });
      var selected = filter.any(function(f) { return name.match(f); });

      return !ignored && selected;
    });
  },

  load: Ember.on('init', Ember.observer('queryUrl', function() {
    var self = this;
    this.set('isLoading', true);

    this.loadAllPages('', []).then(function(files) {
      self.set('isLoading', false);
      self.set('files', files.sort(function(a, b) {
        return b.lastModified - a.lastModified;
      }));
    });
  })),

  loadAllPages: function(marker, files) {
    var self = this;
    var baseUrl = this.get('objectBaseUrl');

    return Ember.$.get(this.get('queryUrl') + '&marker=' + marker).then(function(data) {
      var contents = data.getElementsByTagName('Contents');
      var isTruncated = data.getElementsByTagName('IsTruncated')[0].firstChild.data === "true";
      var length = contents.length;

      self.set('response', data);

      for(var i = 0; i < length; i++) {
        var size = contents[i].getElementsByTagName('Size')[0].firstChild.data;
        var name = contents[i].getElementsByTagName('Key')[0].firstChild.data;
        var lastModified = new Date(contents[i].getElementsByTagName('LastModified')[0].firstChild.data);

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

      if (isTruncated) {
        var lastFile = files[files.length - 1];
        return self.loadAllPages(lastFile.get('name'), files);
      } else {
        return files;
      }
    });
  }
});

App.S3File = Ember.Object.extend({
  scriptTag: Ember.computed('url', function(){
    var escapedURL = Ember.Handlebars.Utils.escapeExpression(this.get('url'));

    return new Ember.Handlebars.SafeString('<script src="' + escapedURL + '"></script>').toString();
  }),

  url: Ember.computed('baseUrl', 'relativePath', function(){
    return this.get('baseUrl') + '/' + this.get('relativePath');
  })
});

App.Project = Ember.Object.extend();

App.Project.reopenClass({
  FIXTURES:
    [ {
      projectName: 'Ember',
      baseFileName: 'ember',
      projectFilter: [ /ember\./, /ember-template-compiler/ ],
      projectRepo: 'emberjs/ember.js',
      channel: "tagged"
    }, {
      projectName: 'Ember Data',
      baseFileName: 'ember-data',
      projectFilter: [ /ember-data\./ ],
      projectRepo: 'emberjs/data',
      channel: "tagged"
    }, {
      projectName: "Ember",
      baseFileName: 'ember',
      projectFilter: [ /ember\./, /ember-template-compiler/ ],
      projectRepo: 'emberjs/ember.js',
      initialVersion: "2.0.0",
      initialReleaseDate: "2015-08-13",
      lastRelease: "2.0.1",
      futureVersion: "2.0.2",
      channel: "release",
      date: "2015-08-22",
      changelogPath: "CHANGELOG.md",
      enableTestURL: true,
      debugFileName: ".debug.js"
    }, {
      projectName: "Ember",
      baseFileName: 'ember',
      projectFilter: [ /ember\./, /ember-template-compiler/ ],
      projectRepo: 'emberjs/ember.js',
      lastRelease: "2.1.0-beta.3",
      futureVersion: "2.1.0-beta.4",
      finalVersion: '2.1.0',
      channel: "beta",
      cycleEstimatedFinishDate: '2015-10-01',
      date: "2015-09-06",
      nextDate: "2015-09-13",
      changelogPath: "CHANGELOG.md",
      enableTestURL: true,
      debugFileName: ".debug.js",
      ignoreFiles: ['ember.js']
    }, {
      projectName: "Ember Data",
      baseFileName: 'ember-data',
      projectFilter: [ /ember-data\./ ],
      projectRepo: 'emberjs/data',
      lastRelease: "2.0.0",
      futureVersion: "2.0.1",
      channel: "release",
      date: "2015-08-20",
      changelogPath: "CHANGELOG.md",
      debugFileName: ".js"
    }, {
      projectName: "Ember Data",
      baseFileName: 'ember-data',
      projectFilter: [ /ember-data\./ ],
      projectRepo: 'emberjs/data',
      lastRelease: "2.1.0-beta.1",
      futureVersion: "2.1.0-beta.2",
      finalVersion: '2.1.0',
      channel: "beta",
      date: "2015-08-20",
      changelogPath: "CHANGELOG.md",
      debugFileName: ".js"
    }, {
      projectName: "Ember",
      baseFileName: 'ember',
      projectFilter: [ /ember\./, /ember-template-compiler/ ],
      projectRepo: 'emberjs/ember.js',
      channel: "canary",
      enableTestURL: true,
      debugFileName: ".debug.js",
      ignoreFiles: ['ember.js']
    }, {
      projectName: "Ember Data",
      baseFileName: 'ember-data',
      projectFilter: [ /ember-data\./ ],
      projectRepo: 'emberjs/data',
      channel: "canary",
      debugFileName: ".js"
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
      return allProjects.filterBy('projectName', name);
  }
});

App.BuildCategoryMixin = Ember.Mixin.create({
  renderTemplate: function() {
    this.render('build-list');
  }
});

App.ApplicationController = Ember.Controller.extend({
  isIndexActive: Ember.computed('currentRouteName', function(){
    return this.isActiveChannel('index');
  }),

  isTaggedActive: Ember.computed('currentRouteName', function(){
    return this.isActiveChannel('tagged');
  }),

  isChannelsActive: Ember.computed('currentRouteName', function(){
    var self = this;
    return !['index','tagged'].some(function(name){ return name === self.get('currentRouteName'); })
  }),

  isReleaseActive: Ember.computed('currentRouteName', function(){
    return this.isActiveChannel('release');
  }),

  isBetaActive: Ember.computed('currentRouteName', function(){
    return this.isActiveChannel('beta');
  }),

  isCanaryActive: Ember.computed('currentRouteName', function(){
    return this.isActiveChannel('canary');
  }),

  isActiveChannel: function(channel){
    return this.get('currentRouteName').indexOf(channel) !== -1;
  }
});

App.ProjectsMixin = Ember.Mixin.create({
  projects: Ember.computed('channel', 'model', function(){
    var projects = App.Project.find(this.get('channel')),
        bucket   = this.get('model'),
        self = this;

    projects.forEach(function(project){
      if (project.channel === 'beta'){
        project.isEmberBeta = project.projectName === 'Ember';

        [1,2,3,4,5].forEach(function(increment){
          var versionParts = project.lastRelease.split('.');
          var currentBetaNumber = parseInt(versionParts[versionParts.length - 1], 10);
          project['beta' + increment + 'Completed'] = increment <= currentBetaNumber;
          project['isBeta' + increment] = increment === currentBetaNumber;
        });

        var release = App.Project.find('release', project.projectName)[0];

        // no releases exist for ember-data (yet)
        if (release) {
          project.lastStableVersion = release.initialVersion;
          project.lastStableDate = release.initialReleaseDate;
        }
      }

      project.files = bucket.filterFiles(project.projectFilter, project.ignoreFiles);
      project.description = self.description(project);
      project.lastReleaseDebugUrl = self.lastReleaseUrl(project.baseFileName, project.channel, project.lastRelease, project.debugFileName);
      project.lastReleaseProdUrl  = self.lastReleaseUrl(project.baseFileName, project.channel, project.lastRelease, '.prod.js');
      project.lastReleaseMinUrl   = self.lastReleaseUrl(project.baseFileName, project.channel, project.lastRelease, '.min.js');

      if (project.enableTestURL) {
        project.lastReleaseTestUrl  = self.lastReleaseUrl(project.baseFileName, project.channel, project.lastRelease, '-tests-index.html');
      }

      if (project.channel === 'canary') {
        project.lastRelease = 'latest';
      } else if (project.changelog !== 'false') {
        project.lastReleaseChangelogUrl   = 'https://github.com/' + project.projectRepo + '/blob/v' + project.lastRelease + '/' + project.changelogPath;
      }
    });

    return projects;
  }),

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

    return new Ember.Handlebars.SafeString(value);
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

App.CanaryController = Ember.Controller.extend(App.ProjectsMixin, {
  templateName: 'buildList',
  channel: 'canary'
});

App.BetaRoute = Ember.Route.extend(App.BuildCategoryMixin, {
  model: function() {
    return App.S3Bucket.create({title: 'Beta Builds', prefix: 'beta/'});
  }
});

App.BetaController = Ember.Controller.extend(App.ProjectsMixin, {
  templateName: 'buildList',
  channel: 'beta'
});

App.ReleaseRoute = Ember.Route.extend(App.BuildCategoryMixin, {
  model: function() {
    return App.S3Bucket.create({title: 'Release Builds', prefix: 'release/'});
  }
});

App.ReleaseController = Ember.Controller.extend(App.ProjectsMixin, {
  templateName: 'buildList',
  channel: 'release'
});

App.TaggedRoute = Ember.Route.extend(App.BuildCategoryMixin, {
  model: function() {
    var bucket = App.S3Bucket.create({
      title: 'Tagged Release Builds',
      prefix: 'tags/v',
      delimiter: '',
    });
    return bucket;
  }
});

App.TaggedController = Ember.Controller.extend(App.ProjectsMixin, {
  channel: 'tagged'
});
/*
 * Handlebars Helpers
 */
App.FormatDateTimeHelper = Ember.Helper.helper(function(date, format, options) {
  if (!options) {
    options = format;
    format = null;
  }

  if (format){
    return moment(date[0]).format(format);
  } else {
    return moment(date[0]).fromNow();
  }
});
