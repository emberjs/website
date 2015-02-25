You can use the inspector to measure the time it takes for your views to
be created. Click on `Render Performance` to start inspecting render times.

<img src="/guides/ember-inspector/images/render-performance-screenshot.png" width="680"/>

### Accuracy

The inspector itself adds a delay to your rendering, so the render durations you see
are not an accurate representation of your production apps. Use these
numbers to compare durations and debug rendering bottlenecks, but not as
a way to accurately measure rendering times.


### Toolbar

Click on the "clear" icon to remove existing render logs.

To measure views that are rendered on initial application boot, you will
need to click on the "Reload" button at the top. This button ensures
that the inspector starts measuring render times immediately when your app boots.

To filter the render logs, type a query in the search box.



