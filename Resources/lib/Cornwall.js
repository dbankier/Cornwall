var Cornwall = Cornwall || {};
Cornwall.execute = function (fn,arg) {
  try {
    var args = [];
    for (var i = 1, length = arguments.length; i< length; i++) {
      args.push(arguments[i]);
    }
    Ti.App.fireEvent("cornwall:" + Cornwall.id, {fn: fn.toString(), args: args});
  } catch (e) {
    alert(e);
  } 
}
