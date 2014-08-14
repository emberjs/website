##Ember Builds

The Ember Release Management Team maintains a variety of ways to get  Ember and Ember Data builds.

###Channels
The latest [Release](/builds#/release), [Beta](/builds#/beta), and [Canary](/builds#/canary) builds of Ember and Ember data can be found [here](/builds). For each channel a development, minified, and production version is available. For more on the different channels read the [Post 1.0 Release Cycle](/blog/2013/09/06/new-ember-release-process.html) blog post.

###Tagged Releases
Past release and beta builds  of Ember and Ember Data are available at [Tagged Releases](/builds#/tagged). These builds can be useful to track down regressions in your application, but it is recommended to use the latest stable release in production.



##Bower

Bower is a package manager for the web. Bower makes it easy to manage dependencies in your application including Ember and Ember Data. To learn more about Bower visit [http://bower.io/](http://bower.io/).

Adding Ember to your application with Bower is easy; simply run `bower install ember --save`. For Ember Data, run `bower install ember-data --save`. You can also add `ember` or `ember-data` to your `bower.json` file as follows.

```json
{
	"name": "your-app",
	"dependencies": {
		"ember": "~1.6",
		"ember-data": "~1.0.0-beta.8"
	}
}

```

##RubyGems

If your application uses a Ruby based build system, you can use the [ember-source](http://rubygems.org/gems/ember-source) and [ember-data-source](http://rubygems.org/gems/ember-data-source) RubyGems to access ember and ember data sources from Ruby.

If your application is built in Rails, the [ember-rails](http://rubygems.org/gems/ember-rails) RubyGem makes it easy to integrate Ember into your Ruby on Rails application.

