# Ember Times

The Ember Times is a blog newsletter with weekly updates from the Ember land.
It is part of the [Emberjs.com](https://emberjs.com/) website and managed by the Learning Team and friends.

## Contributing

Anyone can become an Ember times editor. The best way to start is to join #topic-embertimes channel on [Ember Community Slack](https://ember-community-slackin.herokuapp.com/). New blog posts are released every Friday. 

The process to publish a new weekly post is as follows:

- The championing editor of the week creates a branch with the MD file containing next week blog post
- Editors will then pull request against that branch with changes to that file
- Once the new blog post file is complete, the newly created branch is merged back into the website
- As a last step, the content is copied over to [Goodbits](https://the-emberjs-times.ongoodbits.com/), which is the tool currently being used to send the newsletter and manage its subscriptions

The Reader's Questions section of the newsletter is usually answered by core team members, but anyone can give a helping hand. 
The answers are posted on [discuss.emberjs.com](https://discuss.emberjs.com/) and linked back to the weekly blog post.

### Goodbits

To prepare the newsletter broadcast on Goodbits the following steps are necessary:

- Log into Goodbits
- From the list of emails, duplicate one of the latest entries to create a new draft one
- Edit the blocks from the newly duplicated draft, with the new blog post content
- Select 'Prepare to send'
- Choose the option 'Send later' and schedule it to Friday 9 PM UTC

### What is new in Ember land

There is a tool available to gather the weekly contributions on Ember repos and to generate the contributors' list, here: [what-is-new-in-emberland](https://github.com/jessica-jordan/whats-new-in-emberland). It's an Ember app 🐹, you can simply download, build it and serve it!

### Pushing your changes to the blog post

A typical Git forking workflow can be used to contribute:

- Fork this repo
- Clone the repo in your own machine
- Commit changes to your own branch
- Push the changes
- Create a pull request to the new blog post branch on the original repo

To update your fork with the new weekly branch you can do:

```sh
git fetch upstream
git checkout -b newblogpostbranch upstream/newblogpostbranch
git push -u origin newblogpostbranch
```
To set the upstream you can use:

```sh
git remote add upstream https://github.com/emberjs/website
```

And last but not least, you can set the origin by doing:

```sh
git remote add origin https://github.com/YOUR_USERNAME/website
```

