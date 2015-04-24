// Main application logic goes here!
$("header h2").percentext({width: 75, maxFontSize: 130});
$("header h5").percentext({width: 78, maxFontSize: 36});

var cats = new ReqKit.Collections.cats([
  {url: 'http://www.cat.com', emotion: 'happy'},
  {url: 'http://www.kitten.com', emotion: 'sad'}
]);

var demoView = new ReqKit.Views.demo({
  collection: cats,
  el: "#demo"
});