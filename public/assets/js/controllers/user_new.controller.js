window.reqKitControllers.userNew = _.extend({}, window.reqKitControllers.application, {
  form:             "#request-api-key-form",
  fieldEmail:       "#request-api-key-email",
  fieldSubmit:      "#request-api-key-submit",
  fieldSubmitIcon:  "#request-api-key-icon",

  apiKeyContainer:  ".api-key-container",
  apiKeySpan:       ".api-key",

  apiKey:           null,

  initialize: function() {

  },

  requestKey: function(data) {
    return $.ajax(window.reqKitConstants.ApiUserCreate, {
      method: "POST",
      data: JSON.stringify(data),
      contentType: "application/json"
    });
  },

  updateState: function(state) {
    if ( state === "processing" ) {
      $(this.fieldEmail).addClass("shrunken");
      $(this.fieldSubmit).addClass("sending");
      $(this.fieldSubmitIcon).removeClass("fa-chevron-right").addClass("fa-cog fa-spin");
    } else if ( state === "error" ) {
      $(this.fieldEmail).val("");
      $(this.fieldSubmit).addClass("error");
      $(this.fieldSubmitIcon).removeClass("fa-cog fa-spin").addClass("fa-times");
      window.setTimeout(function() { this.updateState("default"); }.bind(this), 3000);
    } else if ( state === "completed" ) {
      $(this.fieldSubmit).addClass("completed");
      $(this.fieldSubmitIcon).removeClass("fa-cog fa-spin").addClass("fa-check");
      
      window.setTimeout(function() {
        $(this.form).slideUp(500);
      }.bind(this), 1000);

      window.setTimeout(function() {
        $(this.apiKeyContainer).fadeIn(500);
      }.bind(this), 1500);
    } else if ( state === "default" ) {
      $(this.fieldEmail).removeClass("shrunken");
      $(this.fieldSubmit).removeAttr("class");
      $(this.fieldSubmitIcon).attr("class", "fa fa-chevron-right");
    }
  },

  handleSubmit: function() {
    var data = {
      email: $(this.fieldEmail).val()
    };

    if ( !data.email ) {
      alert("We require an email, silly!");
      return false;
    }

    // visual cues - change submit style and submit icon contents
    this.updateState("processing");

    this.requestKey(data)
    .then(function(response) {
      this.apiKey = response.api_key;
      $(this.apiKeySpan).text(this.apiKey);

      this.updateState("completed");
    }.bind(this), function(err) {
      this.updateFlashMessage("Something went wrong T_T", "alert");
      this.updateState("error");
    }.bind(this));
  }

});