## Problem
You want to display an Ember content array from an ArrayController in descending order instead of ascending order (the default).

## Solution
1. Convert the built-in content array to a normal JavaScript array, then reverse it. You use Ember's @each property to mirror the reverse change to the content array.
2. User the built-in `sortProperties` and `sortAscending` properties to reverse the order.

### Example

<a class="jsbin-embed" href="http://jsbin.com/opid/3/embed?html,js,output>JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

## Discussion
