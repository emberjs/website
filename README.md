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

To populate organizers data from meetup.com on http://localhost:4567/meetups

  * get a [meetup API Key](https://secure.meetup.com/meetup_api/key/)
  * set ENV["MEETUP_API_KEY"]
  * run the following rake command

``` sh
rake findorganizers [force=true]

The force=true flag will overwrite all existing organizer data
```

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

Once Middleman comes up, you'll be prompted by Windows Firewall. Click "Allow access" and you'll be in business!
