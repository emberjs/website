### Problem

Display JavaScript Date objects in human readable format.

### Solution

There are two ways of formatting the value:

1. Create a Handlebars helper `{{format-date}}` and use it in your template
2. Create a computed property `formattedDate` that will return a transformed date

We will use [Moment.js](http://momentjs.com) for formatting dates.

Let's look at a simple example. You're working on a website for your
client, and one of the requirements is to have the current date on the index page in human readable format. This is a perfect place to use a
Handlebars helper that "pretty prints" the current date:

```javascript
Ember.Handlebars.registerBoundHelper('currentDate', function() {
  return moment().format('LL');
});
```

Your template will look like:

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

Let's look at another example. Say you need
to create a simple control that allows you to type in a date and
a date format. The date will be formatted accordingly.

Define `formattedDate` computed property that depends on
`date` and `format`. Computed property in this example does
the same thing as Handlebars helpers defined above.

```javascript
App.ApplicationController = Ember.Controller.extend({
  format: "YYYYMMDD",
  date: null,
  formattedDate: function() {
    var date = this.get('date'),
        format = this.get('format');
    return moment(date).format(format);
  }.property('date', 'format')
});
```

```html
{{input value=date}}
{{input value=format}}
<div>{{formattedDate}}</div>
```

### Discussion

Both helper and computed property can format your date value. 
Which one do I use and when?

Handlebars helpers are shorthand for cases where you want to format
a value specifically for presentation. That value may be used 
across different models and controllers.

You can use `{{currentDate}}` across your application to format dates
without making any changes to controllers.

Computed property in the example above does the same thing as the
Handlebars helper with one big difference:
`formattedDate` can be consumed later without applying
date format on the date property again.

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/iCaGUne/4/edit?output">JS Bin</a>
