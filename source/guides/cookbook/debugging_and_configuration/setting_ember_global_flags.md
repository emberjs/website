# Setting Ember Global Flags

## Problem
You want to control features of Ember by setting specified global flags like `Ember.LOG_BINDINGS`.

## Solution
Create a `windows.ENV` with these properties set to the desired value before Ember is loaded.

## Discussion
