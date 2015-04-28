window.reqKitControllers.catNew = _.extend({}, window.reqKitControllers.application, {

  // The CSS selectors for our various form fields
  fieldUrl:     "#field-url",
  fieldEmotion: "#field-emotion",
  fieldOwner:   "#field-owner",
  fieldApiKey:  "#field-api-key",

  savedCats: [],

  initialize: function() {
    this.populateEmotionsSelect(this.fieldEmotion, "select one", true);
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
    var data = {
      url:      $(this.fieldUrl).val(),
      emotion:  $(this.fieldEmotion).val(),
      owner:   $(this.fieldOwner).val()
    };

    var headers = {
      'Authorization': $(this.fieldApiKey).val()
    };

    // We need to do something to ensure the user knows the request is in progress.
    // For now, we're showing a black overlay and updating the submit button.
    $(".black-overlay").fadeIn(200);
    $(".submit").addClass("in-progress").text("Submitting...");



    if ( !$(this.fieldEmotion + " option:selected").attr("value")) {
      this.updateFlashMessage("Please select an emotion", "alert");
      return false;
    }

    this.postCatData(data, headers)
    .then(function(results) {
      this.savedCats.push(results);

      // Remove visual cues
      $(".black-overlay").fadeOut(200);
      $(".submit").removeClass("in-progress").text("Submit Photo");

      // Clear form fields
      $("#field-url, #field-credit, #field-emotion").val("");

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
