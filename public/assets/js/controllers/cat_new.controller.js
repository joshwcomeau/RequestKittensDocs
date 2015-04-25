window.reqKitControllers.catNew = _.extend({}, window.reqKitControllers.application, {

  // The CSS selectors for our various form fields
  fieldUrl:     "#field-url",
  fieldEmotion: "#field-emotion",
  fieldCredit:  "#field-credit",
  fieldApiKey:  "#field-api-key",

  savedCats: [],

  initialize: function() {
    console.log("initializing");
    this.populateEmotionsSelect(this.fieldEmotion, "select one", true);
    this.fetchFlashMessageTemplate();
  },

  postCatData: function(data, headers) {
    return $.ajax(window.reqKitConstants.ApiCatCreate, {
      method:       'POST',
      data:         JSON.stringify(data),
      headers:      headers,
      dataType:     'json',
      contentType:  'application/json',
      processData:  false
    });
  },

  handleSubmit: function() {
    if ( !$(this.fieldEmotion + " option:selected").attr("value")) {
      console.log("Select a feeliung")
      this.updateFlashMessage("Please select an emotion", "alert");
      return false;
    }

    var data = {
      url:      $(this.fieldUrl).val(),
      emotion:  $(this.fieldEmotion).val(),
      credit:   $(this.fieldCredit).val()
    };

    var headers = {
      'Authorization': $(this.fieldApiKey).val()
    };

    this.postCatData(data, headers)
    .then(function(results) {
      this.savedCats.push(results);

      // Clear form fields

      // Display success message
      this.updateFlashMessage("Successfully saved cat!", "success");

    }.bind(this), function(err) {
      if (err.status === 401) {
        this.updateFlashMessage("You need to be an administrator to add cats.", "alert");
      }
      console.log("Oh no! Something bad happened:", err);
    }.bind(this));


  }


});
