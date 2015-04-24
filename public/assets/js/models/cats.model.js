// cats.model.js
ReqKit.Models.Cat = Backbone.Model.extend({
  defaults: {
    url:     null,
    emotion: moment().format("YYYY-MM-DD")
  },

  initialize: function() {
    // do fancy stuffs here
  }
});