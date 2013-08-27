# Continuous redrawing of views

## Problem
You'd like to redraw your views every few seconds/minutes e.G. to update relative timestamps (like on twitter.com).

## Solution
Have a global `pulse` attribute in your application that you're incrementing inside a `setInterval` and let the views bind the values to be refreshed to that attribute.

## Discussion