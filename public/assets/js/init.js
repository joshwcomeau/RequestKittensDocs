// The first JS file loaded.


(function() {
  var developmentMode = false;

  var BASE_URL = developmentMode ? 'http://localhost:3000' : 'http://requestkittens.com';

  window.reqKitConstants = {
    catTemplate:      developmentMode ? '/templates/cat.template.html' : '/RequestKittensDocs/public/templates/cat.template.html',
    fmTemplate:       developmentMode ? '/templates/flash_message.template.html' : '/RequestKittensDocs/public/templates/flash_message.template.html',
    ApiCatIndex:      BASE_URL+'/cats',
    ApiCatCreate:     BASE_URL+'/cats',
    ApiEmotionIndex:  BASE_URL+'/emotions',
    ApiUserCreate:    BASE_URL+'/users',
    ApiKey:           '7d791ff16add503b2542c23afb3aeab0'
  };

  window.reqKitControllers = {};

  if (!developmentMode) {
    // Add our <base> tag to the top of our <head>
    $("head").prepend('<base href="http://joshwcomeau.github.io/RequestKittensDocs/public/">')
  }
}());