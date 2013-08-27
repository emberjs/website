# Displaying Content Arrays in Reverse Order 
## Problem
You want to display an Ember content array from an ArrayController in descending order instead of ascending order (the default).

## Solution
You convert the built-in content array to a normal JavaScript array, then reverse it. You use Ember's @each property to mirror the reverse change to the content array.

## Discussion
