// demo.view.js
ReqKit.Views.demo = Backbone.View.extend({
  el: "#demo",
  initialize: function() {
    this._catViews = [];

    console.log("demo initialized")

    this.collection.forEach(function(cat) {
      this._catViews.push(new ReqKit.Views.cat({
        model: cat,
        tagName: "li"
      }));
    }.bind(this));

    this.render();
  },

  render: function() {
    var that = this;
    console.log(that);
    $(this.el).empty();
    console.log(that);

    _(this._catViews).forEach(function(cv) {
      console.log("that", cv.render());
      $(that.el).append(cv.render().el);
    }.bind(this));
  }
});
