// The first JS file loaded.
(function() {
  var BASE_URL = 'http://requestkittens.com';

  window.reqKitConstants = {
    catTemplate:      'http://localhost:8000/templates/cat.template.html',
    fmTemplate:       'http://localhost:8000/templates/flash_message.template.html',
    ApiCatIndex:      BASE_URL+'/cats',
    ApiCatCreate:     BASE_URL+'/cats',
    ApiEmotionIndex:  BASE_URL+'/emotions',
    ApiUserCreate:    BASE_URL+'/users',
    ApiKey:           '7d791ff16add503b2542c23afb3aeab0'
  };

  window.reqKitControllers = {};
}());