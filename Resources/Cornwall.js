var Cornwall = {
  execute: function (fn) {
    try {
        Ti.App.fireEvent("cornwell", {fn: fn.toString()});
    } catch (e) {
        alert(e);
    } 
  }
}
