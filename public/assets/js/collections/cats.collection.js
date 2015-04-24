// cats.collection.js
ReqKit.Collections.cats = Backbone.Collection.extend({
  url: 'http://www.requestkittens.com/cats',
  model: ReqKit.Models.Cat
});