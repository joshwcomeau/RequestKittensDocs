// Main application logic goes here!
$("header h2").percentext({width: 75, maxFontSize: 130});
$("header h5").percentext({width: 78, maxFontSize: 36});

var urls = {
  catTemplate:  '/templates/cat.template.html',
  catApi:       'http://localhost:3000/cats'
};

var API_KEY =   '7d791ff16add503b2542c23afb3aeab0';

var catView = {

  catPrototype: {
    emotion: null,
    url:     null
    // More stuff can be added here (photo source, custom behavior, etc)
  },

  cats: [],

  initialize: function() {
    this.cats = [];

    this.fetchTemplate(urls.catTemplate)
    .done(function(data) { 
      this.template = _.template(data);
    }.bind(this));

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
    return $.ajax(urls.catApi, {
      method: 'GET',
      data: {
        emotion: emotion
      },
      contentType: "application/json",
      headers: {
        'Authorization': API_KEY
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

  /***** 
    Our main function. Triggered by the select menu, causes the view to update.
  ******/
  update: function(emotion) {
    this.fetchCats(emotion)
    .then(function(results) {
      var domCats;

      this.cats = this.buildCatArray(results._items);

      // We have our cat data. Now we need to iterate through them creating templates with them.
      domCats = this.cats.map(function(cat) {
        return this.template(cat);
      }.bind(this));

      // Let's concatenate all those templates, and shove 'em in the DOM!
      $("#cat-container").html(domCats.join(""));
    }.bind(this));
  }


};



catView.initialize();

// Tie the 'update' function on the Select change
$("#select-emotion").on("change", function() {
  var emotion = $(this).val();
  catView.update(emotion);
});