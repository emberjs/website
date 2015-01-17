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

**Note**: unless you're working with the API docs, don't use `rake preview`—use `middleman` (aka `middleman server`) instead.

#### API Documentation

You can preview api documention, by generating docs from the source code.
Clone the three repositories, then from project executing the specific
tasks to build the docs locally.

* For the ember.js and website projects a rake task will build the docs
* For the data project the yuidocjs npm library is required to build docs

Node, npm, Ruby, bundler are required to preview documentation locally

The repositories for ember.js, data and the website need to be located in
the same directory:

    emberjs/
        website/
        ember.js/
        ember-data/

Notice that the name of the data project needs to use `ember-data` not `data`

In the website directory execute `bundle exec rake generate_docs`

You can launch the website via `bundle exec middleman` to preview the generated docs.


### Requirements

If the `bundle` command fails to run, you may need to upgrade your Ruby version. The Ember.js website build requires 1.9.3 or newer (2.0.0 recommended). You can use [RVM](https://rvm.io/) to install it:

``` sh
curl -L https://get.rvm.io | bash -s stable
rvm install 2.0.0
rvm use 2.0.0
```

### Troubleshooting tips for Windows devs

For Windows developers using [RubyInstaller](http://rubyinstaller.org/), you'll need to [download the DevKit](http://rubyinstaller.org/downloads) and install it using instructions:
https://github.com/oneclick/rubyinstaller/wiki/Development-Kit

After you have a proper install, you can then run:
``` sh
gem install bundler wdm tzinfo-data
gem update listen middleman
```

**NOTE**: if you get an error like this:
```Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://rubygems.org/latest_specs.4.8.gz)```
follow the [instructions on this post](https://gist.github.com/luislavena/f064211759ee0f806c88) to install the trust cert.

At this point, you should be able to run ```bundle exec middleman```. You may be prompted by Windows Firewall; Click "Allow access" and you'll be in business!
