// Each instance needs a unique identifier
function uniqueId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var possibilities = possible.length;
  var i;

  for(i=0; i < 8; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possibilities));
  }
  return text + (new Date()).getTime();
}

function CornwallWebView(params) {

  var __web = Ti.UI.createWebView(params);
  __web.id = uniqueId();

  function evalFn(o) {
    try{ 
      eval("(" + o.fn.replace(/Cornwall.callback\(([^\)]*)\)/g, "(function(o) { __web.evalJS('$1(' + JSON.stringify(o) + ');');})") + ")("+ JSON.stringify(o.args).slice(1,-1) +")");
    } catch (e) {
      alert(e);
    }
  }

  Ti.App.addEventListener("cornwall:" + __web.id, evalFn);

  __web.cleanup = function() {
    Ti.App.removeEventListener("cornwall:" + __web.id, evalFn);
  }

  // Inject unique id
  __web.addEventListener('load', function() {
    __web.evalJS("Cornwall.id = '" + __web.id + "';");
  });

  // FOR URL SCHEME - cornwall:// if enabled
  var url = '';
  if (Ti.Platform.osname !== "android" && params.loadsFromContextUrl) {
    //Need to manually download html and inject into WebView to ensure Ti Injection for remote pages
    function loadRemote(url) {
      var xhr = Ti.Network.createHTTPClient();
      xhr.open("GET",url);
      xhr.onerror = function(e)
      {
        alert('ERROR: ' + e.error);
      };
      xhr.setTimeout(30000);
      xhr.onload = function(){ 
        __web.html = this.responseText.replace("</head>","<script>var Cornwall = Cornwall || {}; Cornwall.id = '" + __web.id + "';</script></head>");
        __web.evalJS();
      }; 
      xhr.send();
    }

    var cmd = Ti.App.getArguments();
    if ( (typeof cmd === 'object') && cmd.hasOwnProperty('url') ) {
      url = cmd.url;
      loadRemote(url.replace("cornwall", "http"));
    }

    Ti.App.addEventListener( 'resumed', function(e) {
      cmd = Ti.App.getArguments();
      if ( (typeof cmd === 'object') && cmd.hasOwnProperty('url') ) {
        if ( cmd.url !== url ) {
          url = cmd.url;
          loadRemote(url.replace("cornwall", "http"));
        }
      }
    });
  }

  return __web;
}



module.exports = CornwallWebView;
