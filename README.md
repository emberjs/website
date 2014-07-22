## Ember Website

The website for the Ember.js project.

### Contributing

To get started:

``` sh
git clone git://github.com/emberjs/website.git
cd website
bundle
bundle exec middleman
```

Then visit [http://localhost:4567/](http://localhost:4567/)

#### API Documentation

You can preview api documention, by generating docs from the source code.
Clone the three repositories, then from project executing the specific
tasks to build the docs locally. 

* For the ember.js and website projects a rake task will build the docs
* For the data project the yuidocjs npm library is required to build docs

Node, npm, Ruby, bundler are required to preview documentation locally

The repositories for ember.js, data and the website need be located in
the same directory:

    emberjs/
        website/
        ember.js/
        ember-data/

Notice that the name of the data project needs to use `ember-data` not `data`

* In the ember.js directory execute `node bin/generate_docs.js`
* In the ember-data directory execute `grunt docs`
* Finally, in the website directory execute `bundle exec rake generate_docs`

You can launch the website, `bundle exec middleman`, to preview the generated docs.


### Requirements

If the `bundle` command fails to run, you may need to upgrade your Ruby version. The Ember.js website build requires 1.9.3 or newer (2.0.0 recommended). You can use [RVM](https://rvm.io/) to install it:

``` sh
curl -L https://get.rvm.io | bash -s stable
rvm install 2.0.0
rvm use 2.0.0
```
