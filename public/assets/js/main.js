// Main application logic goes here!
$("header.full-ver h2").percentext({width: 75, maxFontSize: 130});
$("header.full-ver h5").percentext({width: 78, maxFontSize: 36});

$("header.smaller-ver h2").percentext({width: 50, maxFontSize: 100});
$("header.smaller-ver h5").percentext({width: 55, maxFontSize: 30});

var BASE_URL = 'http://requestkittens.com'

var urls = {
  catTemplate:      '/templates/cat.template.html',
  ApiCatIndex:      BASE_URL+'/cats',
  ApiEmotionIndex:  BASE_URL+'/emotions'
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

    this.populateEmotionsSelect("&nbsp;");

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
    return $.ajax(urls.ApiCatIndex, {
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

  fetchEmotions: function() {
    return $.ajax(urls.ApiEmotionIndex, {
      method: 'GET',
      contentType: "application/json",
      headers: {
        'Authorization': API_KEY
      }
    });
  },

  populateEmotionsSelect: function(defaultText) {
    var options = "<option val=''>"+defaultText+"</option>";

    this.fetchEmotions()
    .then(function(emotions) {
      options += emotions._items.map(function(emo) {
        return "<option val='"+ emo.name +"'>"+ emo.name +"</option>";
      });

      $("#select-emotion").html(options);
    })
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





// Tie the 'update' function on the Select change
$("#select-emotion").on("change", function() {
  $("section#demo").addClass("has-cats");
  
  var emotion = $(this).val();
  catView.update(emotion);
});