<!--
  Guides have moved to http://guides.emberjs.com.
  This file exists so a <meta> redirect is created
  via layouts/guide.erb
-->

NAMED ARGUMENTS

Helper arguments are useful for passing data to be transformed into helper functions. However, because the order in which you pass these arguments matters, it is usually best not to have more than one or two of them.

That said, sometimes you may want to make behavior of helpers configurable by the developers that call them from their templates. That’s where named arguments come in.  For example, what if we want to format foreign currency?  Let’s update our format-currency helper to take an optional argument for which currency symbol to display.

Named arguments are passed as a JavaScript object that contains the name of the argument along with an associated value. The order in which named arguments are supplied does not affect functionality.

In this example, we can pass a sign argument to our format-currency helper:
