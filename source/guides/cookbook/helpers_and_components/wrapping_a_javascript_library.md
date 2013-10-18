### Problem
You have a javascript library or jQuery plugin you'd like to use inside your Ember application.

### Solution
Write a custom component that wraps your library.

For this example, we'll create a video player component using [Video.js](http://www.videojs.com/).
Video.js is an HTML5 video player that uses a Flash fallback for browsers that don't support HTML5 video.

```handlebars
{{video-player src="http://vjs.zencdn.net/v/oceans.mp4"}}
```

Include [Video.js](http://www.videojs.com/)'s code in your HTML:

```html
<link href="//vjs.zencdn.net/4.1/video-js.css" rel="stylesheet">
<script src="//vjs.zencdn.net/4.1/video.js"></script>
```

Create a `components/video-player` template:

```handlebars
<video id="player" class="video-js vjs-default-skin">
  <source {{bindAttr src=src}} type="video/mp4"></source>
</video>
```

Create a component to interact with [Video.js](http://www.videojs.com/):

```javascript
App.VideoPlayerComponent = Ember.Component.extend({
  // `didInsertElement` gets called after our element gets inserted
  // into the DOM. Here's where we can initialize video.js.
  didInsertElement: function() {
    this.player = videojs('player', { controls: true });
  },

  // `willDestroyElement` gets called when our component will be removed from the DOM.
  // Video.js provides a `dispose` method to do any necessary cleanup.
  willDestroyElement: function() {
    this.player.dispose();
  },

  // Register an observer on the `src` attribute. When `src` changes, we schedule
  // a method to be called after the template is rendered with the new src value.
  srcDidChange: function(){
    Ember.run.scheduleOnce('afterRender', this, 'updateSrc');
  }.observes('src'),

  // After rendering, we tell video.js to load the new video.
  updateSrc: function(){
    if (!this.player) { return; } // in case `player` isn't yet initialized
    this.player.src(this.get('src'));
    this.player.load();
  }
});
```

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/AtaFaFe/latest/embed?js,output">JS Bin</a>

