## Write a new guide

### Download the emberjs website

To write a new guide you first have to fork the emberjs website.

```bash
git clone https://github.com/emberjs/website.git
cd website
```

Afterwards you can start a local server which serves the website on [http://localhost:4567/](http://localhost:4567/)

```bash
bundle
bundle exec middleman
```

### Add a new Guide

The emberjs website uses the [Middleman](http://middlemanapp.com/) framework to generate the site.
All available guides are defined in the file `data/guides.yml`. Add a new guide by adding a new entry to the list:

```yaml
guides:
	...
	- title: guide_title
	  sections:
		 	- introduction
		    - first_section
```

This will add a new guide with specified title and the two sections *introduction* and *first_section*. After specifying the basic structure of the guide, the actual guide needs to be written.

Create a folder named `guide_title` inside `source/guides` and create two files named `introduction.md` and `first_section.md` inside them.

Now you are ready to go to fill the files with good stuff about ember.