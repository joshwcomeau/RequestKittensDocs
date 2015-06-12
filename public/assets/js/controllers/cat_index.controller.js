window.reqKitControllers.catIndex = _.extend({}, window.reqKitControllers.application, {

  catPrototype: {
    emotion: null,
    url:     null
    // More stuff can be added here (photo source, custom behavior, etc)
  },

  cats: [],
  cat: null,

  emotionSelector: "#select-emotion",
  catContainer:    "#cat-container",

  initialize: function() {
    this.cats = [];

    // Pre-fetch our cat Index template (repeated 4 times when the user selects an emotion)
    this.fetchTemplate(window.reqKitConstants.catIndexTemplate)
    .done(function(data) { 
      this.indexTemplate = _.template(data);
    }.bind(this));

    // Pre-fetch our cat Show template (shown in a modal when the user clicks one of the 4 cats)
    this.fetchTemplate(window.reqKitConstants.catShowTemplate)
    .done(function(data) { 
      this.showTemplate = _.template(data);
    }.bind(this));

    this.populateEmotionsSelect(this.emotionSelector, "&nbsp;", true)
    .then(function(emos) {
      return this.populateEmotionsList(emos, ".list-of-emotions");
    }.bind(this))
    .then(function() {
      $("#demo h3").fadeIn(500);
    });
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
    var optsString = "?numOfResults=4&imageSize=all";

    return $.ajax(window.reqKitConstants.ApiCatIndex+optsString, {
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
      return this.indexTemplate(cat);
    }.bind(this));

    // Let's concatenate all those templates, and shove 'em in the DOM!
    $(this.catContainer).html(domCats.join(""));

    console.log(this.cats);
  },

  /***** 
    Our main function. Triggered by the select menu, causes the view to update.
  ******/
  update: function(emotion) {
    this.fetchCats(emotion)
    .then(function(results) {
      this.populateCatContainer(results);
    }.bind(this));
  },

  viewCat: function(id) {
    var newCatModal;

    // First, find the selected cat in our cats array
    this.cat = _.find(this.cats, function(cat) {
      return cat.id === id;
    });

    // Update the template with these new values
    newCatModal = this.showTemplate(this.cat);

    $("body").prepend(newCatModal);

    // Do some annoying jiggling to get the inner modal div to take up the same width as the cat image.
    window.setTimeout(function() {
      // $(".cat-modal").width( $(".cat-modal-image").width() );
      // $(".cat-modal").height( $(".cat-modal-image").height() );
      $(".modal-overlay, .cat-modal").removeClass("invisible");
    }, 100);
    
  },

  closeCat: function() {
    $(".modal-overlay, .cat-modal").addClass("invisible");
    window.setTimeout(function() {
      $(".modal-overlay, .cat-modal").remove();
    }, 500);
  }


});
