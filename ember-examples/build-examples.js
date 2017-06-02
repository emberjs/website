var fs = require('fs');
var path = require('path');
var spawnSync = require('child_process').spawnSync;
var emberCLIPath = path.resolve(__dirname, './node_modules/ember-cli/bin/ember');

var apps = [
  'binding',
  'components',
  'loading',
  'routing'
];

var symlinkFiles = [
  'package.json',
  'bower.json',
  'ember-cli-build.js',
  'bower_components'
];

function safeLink(appPath, file) {
  var source = path.resolve(__dirname, './' + file);
  var dest = path.resolve(appPath, file);

  if (!fs.existsSync(dest)) {
    fs.symlinkSync(source, dest);
  }
}

apps.forEach(function(app) {
  var appPath = path.resolve(__dirname, './' + app);

  symlinkFiles.forEach(function(file) {
    safeLink(appPath, file);
  });

  var result = spawnSync(emberCLIPath, ['build'], {
    cwd: appPath
  });

  if (result.status !== 0) {
    throw new Error(result.stderr.toString());
  }
});
