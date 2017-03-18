// Used as part of the initial Ember-CLI application.hbs template to welcome new folks
// This is fairly visible, so change with care! :-)

jQuery('#title').hide();

jQuery('head').append('<style>' +
  'body {' +
  '  font-family: "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;' +
  '  font-size: 16px;' +
  '  line-height: 1.35em;' +
  '  background: #FFFBF5;' +
  '}' +
  'p {' +
  '  margin: 0 0 .75em;' +
  '}' +
  'a {' +
  '  color: #dd6a58;' +
  '  text-decoration: none;' +
  '}' +
  'a:hover {' +
  '  color: #c13c27;' +
  '}' +
  'h2 {' +
  '  color: #dd6a58;' +
  '  margin-top: 1em;' +
  '  font-size: 1.75em;' +
  '}' +
  '.welcome-box {' +
  '  width: 800px;' +
  '  color: #865931;' +
  '  margin: 2em auto 0;' +
  '}' +
  '.welcome-box img {' +
  '  float: left;' +
  '  margin-right: 3em;' +
  '  width: 300px;' +
  '  height: 336px;' +
  '}' +
  '.welcome {' +
  '  width: 450px;' +
  '  float: left;' +
  '}' +
  '.welcome ul {' +
  '  list-style: disc;' +
  '  padding-left: 2em;' +
  '  margin-bottom: .75em;' +
  '}' +
  '.welcome > ul > li {' +
  '  padding-bottom: .5em;' +
  '}' +
  '.postscript {' +
  '  clear: both;' +
  '  text-align: center;' +
  '  padding-top: 3em;' +
  '  font-size: 12px;' +
  '  color: #aaa;' +
  '  font-style: italic;' +
  '}' +
  '.postscript code {' +
  '  background-color: #F8E7CF;' +
  '  border-radius: 3px;' +
  '  font-family: Menlo, Courier, monospace;' +
  '  font-size: 0.9em;' +
  '  padding: 0.2em 0.5em;' +
  '  margin: 0 0.1em;' +
  '}' +
  '</style>');

$('#title').after(
  '<div class="welcome-box" style="display:none">' +
  '  <img src="http://emberjs.com/images/tomsters/construction.png" alt="Under construction">' +
  '  <div class="welcome">' +
  '  <h2 id="new-title">Welcome to Ember!</h2>' +
  '  <p>Don\'t mind the dust, but make yourself at home!</p>' +
  '  <p>Seriously though, there isn\'t much to look at here. Below are a few resources to help you get started:</p>' +
  '  <ul>' +
  '    <li><a href="http://guides.emberjs.com">Ember Guides</a> - learn more about Ember</li>' +
  '    <li><a href="http://emberjs.com/api">Ember API</a> - in-depth information about core apis</li>' +
  '    <li><a href="http://www.emberobserver.com">Ember Observer</a> - useful community add-ons</li>' +
  '  </ul>' +
  '  <p>And if you run into problems, please check <a href="http://stackoverflow.com/questions/tagged/ember.js">Stack Overflow</a> or <a href="http://discuss.emberjs.com">our forums</a> for answers.  If you don\'t find what you are looking for, post a question, people love to help new folks get started!</p>' +
  '  </div>' +
  '</div>' +
  '<p class="postscript" style="display:none">To remove this welcome message, remove the <code>ember-cli-welcome.js</code> line in <code>app/templates/application.hbs</code></p>').remove();

$('.welcome-box').fadeIn(1000, function() {
  $('.postscript').delay(500).fadeIn(500);
});
