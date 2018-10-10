# Ember Website
[![Build Status](https://travis-ci.org/emberjs/website.svg?branch=master)](https://travis-ci.org/emberjs/website)

This repository contains the source code and content for some of the [Ember.js public website](https://emberjs.com): the home, blog, community, and about pages.

Other parts of the public website are separate apps: 
- [API Docs](https://github.com/ember-learn/ember-api-docs) 
- [Deprecations](https://github.com/ember-learn/deprecation-app) 
- [The Guides](https://github.com/ember-learn/guides-source)
- [Builds](https://github.com/ember-learn/builds)
- [Status Board](https://github.com/ember-learn/statusboard)

## Contributing

New contributors are welcome! The website is maintained by an all-volunteer team, and we are thankful for your help.

The best way to get started is to find issue labeled "good first issue" or "help wanted." If you have questions or want a buddy to pair with, drop by the #-team-learning channel on the
[Ember Community Discord](https://discordapp.com/invite/zT3asNS).
Like most open source projects, contributors are encouraged to open an issue
to propose changes and iterate on ideas before investing time in coding.
Some tips for working with git/GitHub can be found in
[Making your first pull request](https://github.com/ember-learn/guides-source/blob/master/CONTRIBUTING.md#making-your-first-pull-request) in the Guides respository.

## Running locally with Docker (recommended)

This is the recommended method to run the website app locally.
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
If you are unable to use Docker as described above, here's how to get started
installing dependencies.

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
