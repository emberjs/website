## Problem

You want to display JavaScript Date objects in a human readable format.

## Solution

There are two ways of formating the value:
+ create a Handlebars helper `{{format-date}}` and use it in your template
+ create a computed property `formattedDate` that will return a transformed date

We will use [MomentJs](http://momentjs.com) for formatting dates.

Let's look at a simple example. You're working on the web site for your
client and one of the requirements is to have current date on the index page.
(in human readble format). This is a perfect place to use
handlebars helper that would just "pretty print" current date:

```javascript
Ember.Handlebars.registerBoundHelper('currentDate', function() {
  return moment().format('LL');
});
```

And then your template will look like:
```html
Today's date: {{currentDate}}  // Today's date: August 30 2013
```

You can even enhance your code and pass in the date format to the helper:
```javascript
Ember.Handlebars.registerBoundHelper('currentDate', function(format) {
  return moment().format(format);
});
```

Now you would need to pass an additional parameter to the helper:
```html
Today's date: {{currentDate 'LL'}}  // Today's date: August 30 2013
```

Now, let's take a look at another example. Say you need
to create a simple control that allows you to type in a date,
a date format and it will show you this date formatted accordingly.

Let's define `formattedDate` computed property that depends on
`date` and `format`. Computed property in this example does
the same thing as handlebars helpers defined above.

```javascript
App.ApplicationController = Ember.Controller.extend({
  format: "YYYYMMDD",
  date: null,
  formattedDate: function() {
    var date = this.get('date'),
        format = this.get('format');
    return moment(date).format(format);
  }.property('format')
});
```

```html
{{input value=date}}
{{input value=format}}
<div>{{formattedDate}}</div>
```

## Discussion

Both helper and computed property are going to format you date value. 
Question is which one do I use and when? Good question.

Handlebars helpers are a shorthand for cases where you want to format
a value specifically for presentation but that value might be used 
across multiple different models and controllers.

You can use `{{currentDate}}` across your application to format dates
without making any changes to controllers.

Computed property in the example above does the same thing as
handlebars helper defined above with one big difference:
`formattedDate` can be consumed later without applying
date format on date property again.

## Example

<a class="jsbin-embed" href="http://jsbin.com/atevOPA/8/embed?html,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>