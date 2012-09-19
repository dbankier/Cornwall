Cornwall provides a bridge between Titanium WebViews and the Titanium
javascript environment. 


Uses
----

One application can be to use a webview centric design while exposing the full native
Titanium API (much like competing cross-platform frameworks).

In general however it simply provides a more powerful way of intergrating
Titanium with WebViews you may use in your app.

Watch the following [demo video](http://www.youtube.com/watch?v=2lVEZGhlP8M).
 
(Initial inspiration was really from [here](http://venturebeat.com/2012/05/02/linkedin-ipad-app-engineering/)).


Getting Started
---------------

Have a look at the included `app.js` and `index.html` files for
examples. The Cornwall files are in the `lib` directory. 

In your html file included the `Cornwall.js` file as follows:

```html
<script src="lib/Cornwall.js"></script>
```

Require the `CornwallWebView` CommonJS modules and use it as you would
normally do with a Titanium WebView. For example:

```javascript
var web = new (require("/lib/CornwallWebView"))({
  url: "index.html"
});
```

The following additional boolean property
`loadFromContextUrl` can be set to `true` if you want to load Cornwall
code from webpages. (See below.)

Also the additional `cleanup` method should be called prior to removing
a CornwallWebView or closing a window containing it.   

Using Cornwall
--------------

To execute Titanium Code from your webview use the `Cornwall.execute`
command, e.g.:

```javascript
Cornwall.execute(function() {
  Titanium.Contacts.showContacts({});
});
```

If you want to return values back to the webview, wrap a function in
your webview with a `Cornwall.callback`, for example:

```javascript
var web_popup = function(a) {
  alert("Returned 'a' from Native: " + a.a);
};

Cornwall.execute(function() {
  Cornwall.callback(web_popup)({a:  "A"});
});
```

Note that the javascript code that is execute "over the bridge" is
evaluated in that context. If you want to pass variables across the
bridge follow this example:

```javascript
var start = new Date();
var text = 'Hello World';
Cornwall.execute(function(start, text) {
  alert("Started: " + start + "\Text: " + text);
},start, text);
```

Use in Webpages
---------------

Currently this feature is iOS only.

If you want to see how to use Cornwall in a webpage look at the example
in the `example` directory. Fire up the static webserver enter `node server.js` 
then go to `http://[your-ip-address]:8888` in Safari from your
iPhone.

Any `cornwall://` links from your browser will be
launched in Cornwall to give you the ability to execute native code
from the web.


Project Name
------------

[It is where Titanium is/was
found](http://en.wikipedia.org/wiki/Titanium). To do anything useful you
need to get to where Titanium is found.





