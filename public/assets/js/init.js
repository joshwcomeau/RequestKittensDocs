// The first JS file loaded.
(function() {
  var BASE_URL = 'http://localhost:3000';

  window.reqKitConstants = {
    catTemplate:      '/templates/cat.template.html',
    fmTemplate:       '/templates/flash_message.template.html',
    ApiCatIndex:      BASE_URL+'/cats',
    ApiCatCreate:     BASE_URL+'/cats',
    ApiEmotionIndex:  BASE_URL+'/emotions',
    ApiUserCreate:    BASE_URL+'/users',
    ApiKey:           '7d791ff16add503b2542c23afb3aeab0'
  };

  window.reqKitControllers = {};
}());