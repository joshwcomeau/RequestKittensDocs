// cat.view.js
ReqKit.Views.cat = Backbone.View.extend({
  className: 'cat',
  render: function() {
    this.render = _.bind(this.render, this); 
    this.model.bind('change:url', this.render);

    return $(this.el).html(this.model.get("url"));
  }
});
