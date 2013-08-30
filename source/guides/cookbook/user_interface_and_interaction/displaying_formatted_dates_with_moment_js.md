## Problem
You want to display JavaScript Date objects in a human readable format.

## Solution
Create a computed view property or handlebars bound helper that uses Moment.js

## Discussion

[MomentJs](http://momentjs.com) is a javascript date library for parsing, validating, manipulating, and formatting dates.

There are two ways of formating the value:
+ create a Handlebars helper and call it in your template: `{{timeAgo createAt}}`
+ create a computed property `formattedDate` that will return a transformed date: `moment(date).fromNow()`

### Example

<a class="jsbin-embed"
href="http://jsbin.com/atevOPA/5/embed?html,js,output">JS Bin</a><script
src="http://static.jsbin.com/js/embed.js"></script>