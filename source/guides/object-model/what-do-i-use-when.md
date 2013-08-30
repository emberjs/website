Sometimes new users are confused about when to use computed properties,
bindings and observers. Here are some guidelines to help:

1. Use *computed properties* to build a new property by synthesizing other
properties. Computed properties should not contain application behavior, and
should generally not cause any side-effects when called. Except in rare cases,
multiple calls to the same computed property should always return the same
value (unless the properties it depends on have changed, of course.)

2. *Observers* should contain behavior that reacts to changes in another
property. Observers are especially useful when you need to perform some
behavior after a binding has finished synchronizing.

3. *Bindings* are most often used to ensure objects in two different layers
are always in sync. For example, you bind your views to your controller using
Handlebars.
