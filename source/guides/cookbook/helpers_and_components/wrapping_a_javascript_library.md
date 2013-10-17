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
<video {{bindAttr src=src}} id="player" class="video-js vjs-default-skin" type="video/mp4"/>
```

Create a component to interact with [Video.js](http://www.videojs.com/):

```javascript
App.VideoPlayerComponent = Ember.Component.extend({
  // `didInsertElement` gets called after our element gets inserted
  // into the DOM. Here's where we can initialize video.js.
  didInsertElement: function() {
    this.player = videojs('player', { controls: true });
  },

  // `willDestroyElement` gets called when our component will be removed
  // from the DOM. Video.js provides a `dispose` method that
  // destroys the video player and does any necessary cleanup.
  willDestroyElement: function() {
    this.player.dispose();
  },

  // Here, we observe the `src` property of our component.
  // Whenever this changes, our player will load the new video.
  loadVideo: function(){
    this.player.src(this.get('src'));
    this.player.load();
  }.observes('src')
});
```

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/AtaFaFe/latest/embed?js,output">JS Bin</a>

