var __window = Ti.UI.createWindow({
  backgroundColor: '#fff',
  fullscreen: false,
  exitOnClose: true
});

var __web = Ti.UI.createWebView({
  url: "index.html"
});
__window.add(__web);

Ti.App.addEventListener("cornwell", function(o) {
  try{ 
    eval("(" + o.fn.replace(/Cornwall.callback\(([^\)]*)\)/g, "(function(o) { __web.evalJS('$1(' + (typeof o === \"object\" ? JSON.stringify(o) : '\"' + o + '\"' ) + ');');})") + ")()");
  } catch (e) {
    alert(e);
  }
});




// FOR URL SCHEME - cornwall://

//Need the manual way to ensure Ti Injection
function loadRemote(url) {
  var xhr = Ti.Network.createHTTPClient();
  xhr.open("GET",url);
  xhr.onerror = function(e)
  {
    alert('ERROR: ' + e.error);
  };
  xhr.setTimeout(30000);
  xhr.onload = function(){ 
    __web.html = this.responseText;
  }; 
  xhr.send();
}

var url = '';
if (Ti.Platform.osname !== "android") {
  var cmd = Ti.App.getArguments();
  if ( (typeof cmd == 'object') && cmd.hasOwnProperty('url') ) {
    url = cmd.url;
    loadRemote(url.replace("cornwall", "http"));
  }

  Ti.App.addEventListener( 'resumed', function(e) {
    cmd = Ti.App.getArguments();
    if ( (typeof cmd == 'object') && cmd.hasOwnProperty('url') ) {
      if ( cmd.url !== url ) {
        url = cmd.url;
        loadRemote(url.replace("cornwall", "http"));
      }
    }
  });
}

__window.open();
