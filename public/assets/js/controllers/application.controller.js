// A series of helper methods that can be used by all other controllers,
// through concatenative inheritance.
window.reqKitControllers.application = {
  
  flashMessageContainer:  "#flash-message",
  flashMessageText:       "#flash-message h4",

  fetchEmotions: function() {
    return $.ajax(window.reqKitConstants.ApiEmotionIndex, {
      method: 'GET',
      contentType: "application/json",
      headers: {
        'Authorization': window.reqKitConstants.ApiKey
      }
    });
  },
  populateEmotionsSelect: function(destination, defaultText, showBlankOption) {
    var options = showBlankOption ? "<option>"+defaultText+"</option>" : "";

    return this.fetchEmotions()
    .then(function(emotions) {
      options += emotions._items.map(function(emo) {
        return "<option value='"+ emo.name +"'>"+ emo.name +"</option>";
      });

      $(destination).html(options);

      return emotions;
    });
  },

  populateEmotionsList: function(emos, destination) {
    var emoLis = "";

    emoLis += emos._items.map(function(emo) {
      return "<li>"+ emo.name +"</li>";
    }).join("");

    return $(destination).html(emoLis);
  },

  fetchFlashMessageTemplate: function() {

    return $.get( window.reqKitConstants.fmTemplate, function(template) {
      $("body").prepend(_.template(template)());
    }.bind(this), 'html');
  },

  updateFlashMessage: function(msg, type) {
    // The idea with flash messages is they always exist, they're just hidden off-screen normally.
    // We update the message, show it, wait a few seconds, and hide it.

    $(this.flashMessageText)
      .text(msg)
      .parent()
      .removeClass()
      .addClass("visible " + type);

    // auto-hide it after a few seconds
    window.setTimeout(function() {
      console.log($(this.flashMessageContainer));
      $(this.flashMessageContainer).removeClass("visible");
    }.bind(this), 5000);
  },

  dismissFlashMessage: function() {
    $(this.flashMessageContainer).removeClass();
  }

};