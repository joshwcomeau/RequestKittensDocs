window.reqKitControllers.catIndex = _.extend({}, window.reqKitControllers.application, {

  catPrototype: {
    emotion: null,
    url:     null
    // More stuff can be added here (photo source, custom behavior, etc)
  },

  cats: [],

  emotionSelector: "#select-emotion",
  catContainer:    "#cat-container",

  initialize: function() {
    this.cats = [];

    this.fetchTemplate(window.reqKitConstants.catTemplate)
    .done(function(data) { 
      this.template = _.template(data);
    }.bind(this));

    this.populateEmotionsSelect(this.emotionSelector, "&nbsp;", true);
  },

  generateCat: function(attrs) {
    return _.extend(Object.create(this.catPrototype), attrs);
  },

  /***** 
    Store our Cat template locally
  ******/
  fetchTemplate: function(url) {
    return $.get( url, function(template) {
      return template;
    }.bind(this), 'html');
  },

  fetchCats: function(emotion) {
    return $.ajax(window.reqKitConstants.ApiCatIndex, {
      data: {
        emotion: emotion
      },
      headers: {
        'Authorization': window.reqKitConstants.ApiKey
      }
    });
  },


  /***** 
    Use our cat prototype to build an array of cat objects.
    This adds custom behavior to the server data.
  ******/
  buildCatArray: function(catJson) {
    console.log(this);
    return catJson.map(function(cat) { 

      return this.generateCat(cat); 
    }.bind(this));
  },

  populateCatContainer: function(results) {
    var domCats;

    this.cats = this.buildCatArray(results._items);

    // We have our cat data. Now we need to iterate through them creating templates with them.
    domCats = this.cats.map(function(cat) {
      return this.template(cat);
    }.bind(this));

    // Let's concatenate all those templates, and shove 'em in the DOM!
    $(this.catContainer).html(domCats.join(""));
  },

  /***** 
    Our main function. Triggered by the select menu, causes the view to update.
  ******/
  update: function(emotion) {
    this.fetchCats(emotion)
    .then(function(results) {
      this.populateCatContainer(results);
    }.bind(this));
  }


});
