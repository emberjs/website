/*! GetDevicePixelRatio | Author: Tyson Matanich, 2012 | License: MIT */
(function(n){n.getDevicePixelRatio=function(){var t=1;return n.screen.systemXDPI!==undefined&&n.screen.logicalXDPI!==undefined&&n.screen.systemXDPI>n.screen.logicalXDPI?t=n.screen.systemXDPI/n.screen.logicalXDPI:n.devicePixelRatio!==undefined&&(t=n.devicePixelRatio),t}})(this);
