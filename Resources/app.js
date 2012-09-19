// Needed to trick build
Titanium.Contacts.showContacts;

var __window = Ti.UI.createWindow({
  backgroundColor: '#fff',
  fullscreen: false,
  exitOnClose: true
});

var __web = new (require("/lib/CornwallWebView"))({
  url: "/index.html",
  loadsFromContextUrl: true
});
__window.add(__web);


__window.open();
