# Focusing a Textfield after It's Been Inserted

## Problem
You have a Ember.Textfield instance that you would like become focused after it's been inserted

## Solution
Override the Textfield's `didInsertElement` and apply `focus` by accessing the view's `$` property.

## Discussion
