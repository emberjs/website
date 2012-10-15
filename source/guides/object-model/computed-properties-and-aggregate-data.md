Traditional web applications make the user download a new page every time
they interact with the server. This means that every interaction is never faster
than the latency between you and the user, and usually slower. Using AJAX to
replace only parts of the page helps somewhat, but still requires a roundtrip to
your server every time your UI needs to update. And if multiple parts of the
page need to update all at once, most developers just resort to loading the page
over again, since keeping everything in sync is tricky.

Ember.js, like some other modern JavaScript frameworks, works a little differently.
Instead of the majority of your application's logic living on the server, an
Ember.js application downloads everything it needs to run in the initial page
load. That means that while your user is using your app, she never has to load
a new page and your UI responds quickly to their interaction.

One advantage of this architecture is that your web application uses the same
REST API as your native apps or third-party clients. Back-end developers can
focus on building a fast, reliable, and secure API server, and don't have to be
front-end experts, too.
