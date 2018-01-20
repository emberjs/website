## Ember Website
[![Build Status](https://travis-ci.org/emberjs/website.svg?branch=master)](https://travis-ci.org/emberjs/website)

The website for the Ember.js project.

### Contributing

To get started:

## Running locally with Docker (recommended)

This is the recommended method for new contributors.
Although the website is built with Ruby, most work is done in Markdown files.
You don't need to know Ruby or install its dependencies to help out. Follow
the Docker container instructions below to install and run locally.

First, install [Docker and Compose](https://store.docker.com/search?offering=community&type=edition) and leave it running.

Next, the commands below will install all necessary dependencies for the website
app and start a server. This will take a little while to run,
possibly a few minutes. The dependencies will be installed inside a Docker
container, and do not affect your normal developer environment. 

```sh
git clone git://github.com/emberjs/website.git
cd website
docker-compose build
docker-compose up
```
Subsequent runs will be much faster once all the dependencies are installed. 

You can view the site locally at [http://localhost:4567](http://localhost:4567)

## Running locally with Ruby and Middleman

``` sh
git clone https://github.com/emberjs/website.git
cd website
bundle
bundle exec middleman
```

Then visit [http://localhost:4567/](http://localhost:4567/)

**Note**: unless you're working with the API docs, don't use `rake preview`—use `middleman` (aka `middleman server`) instead.

To populate organizers data from meetup.com on [http://localhost:4567/meetups](http://localhost:4567/meetups)

  * get a [meetup API Key](https://secure.meetup.com/meetup_api/key/)
  * set `ENV["MEETUP_API_KEY"]`
  * run the following rake command

``` sh
rake findorganizers [force=true]

The force=true flag will overwrite all existing organizer data
```

#### API Documentation

API documentation has been moved to a separate repo, please see https://github.com/ember-learn/ember-api-docs/

### Requirements

If the `bundle` command is not found, you can install it with `gem install bundler`.

If the `bundle` command fails to run, you may need to upgrade your Ruby version. Please check the current supported version that described at [.ruby-version](https://github.com/emberjs/website/blob/master/.ruby-version).
You can use [RVM](https://rvm.io/) to install it:

``` sh
$ curl -L https://get.rvm.io | bash -s stable
$ rvm install $(cat .ruby-version)
$ rvm use $(cat .ruby-version)
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
