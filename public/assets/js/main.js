// Main application logic goes here!
$("header.full-ver h2").percentext({width: 75, maxFontSize: 130});
$("header.full-ver h5").percentext({width: 78, maxFontSize: 36});

$("header.smaller-ver h2").percentext({width: 50, maxFontSize: 100});
$("header.smaller-ver h5").percentext({width: 55, maxFontSize: 30});

// Tie the 'update' function on the Select change
$("#select-emotion").on("change", function() {
  $("section#demo").addClass("has-cats");
  
  var emotion = $(this).val();
  window.reqKitControllers.catIndex.update(emotion);
});

