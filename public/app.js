!function(){var t=!0,e=t?"http://localhost:3000":"http://requestkittens.com";window.reqKitConstants={catIndexTemplate:t?"/templates/cat_index.template.html":"/RequestKittensDocs/public/templates/cat_index.template.html",catShowTemplate:t?"/templates/cat_show.template.html":"/RequestKittensDocs/public/templates/cat_show.template.html",fmTemplate:t?"/templates/flash_message.template.html":"/RequestKittensDocs/public/templates/flash_message.template.html",ApiCatIndex:e+"/cats",ApiCatCreate:e+"/cats",ApiEmotionIndex:e+"/emotions",ApiUserCreate:e+"/users",ApiKey:"7d791ff16add503b2542c23afb3aeab0"},window.reqKitControllers={},t||$("head").prepend('<base href="http://joshwcomeau.github.io/RequestKittensDocs/public/">')}(),window.reqKitControllers.application={flashMessageContainer:"#flash-message",flashMessageText:"#flash-message h4",fetchEmotions:function(){return $.ajax(window.reqKitConstants.ApiEmotionIndex,{method:"GET",contentType:"application/json",headers:{Authorization:window.reqKitConstants.ApiKey}})},populateEmotionsSelect:function(t,e,i){var a=i?"<option>"+e+"</option>":"";return this.fetchEmotions().then(function(e){return a+=e._items.map(function(t){return"<option value='"+t.name+"'>"+t.name+"</option>"}),$(t).html(a),e})},populateEmotionsList:function(t,e){var i="";return i+=t._items.map(function(t){return"<li>"+t.name+"</li>"}).join(""),$(e).html(i)},fetchFlashMessageTemplate:function(){return $.get(window.reqKitConstants.fmTemplate,function(t){$("body").prepend(_.template(t)())}.bind(this),"html")},updateFlashMessage:function(t,e){$(this.flashMessageText).text(t).parent().removeClass().addClass("visible "+e),window.setTimeout(function(){console.log($(this.flashMessageContainer)),$(this.flashMessageContainer).removeClass("visible")}.bind(this),5e3)},dismissFlashMessage:function(){$(this.flashMessageContainer).removeClass()}},window.reqKitControllers.catIndex=_.extend({},window.reqKitControllers.application,{catPrototype:{emotion:null,url:null},cats:[],cat:null,emotionSelector:"#select-emotion",catContainer:"#cat-container",initialize:function(){this.cats=[],this.fetchTemplate(window.reqKitConstants.catIndexTemplate).done(function(t){this.indexTemplate=_.template(t)}.bind(this)),this.fetchTemplate(window.reqKitConstants.catShowTemplate).done(function(t){this.showTemplate=_.template(t)}.bind(this)),this.populateEmotionsSelect(this.emotionSelector,"&nbsp;",!0).then(function(t){return this.populateEmotionsList(t,".list-of-emotions")}.bind(this)).then(function(){$("#demo h3").fadeIn(500)})},generateCat:function(t){return _.extend(Object.create(this.catPrototype),t)},fetchTemplate:function(t){return $.get(t,function(t){return t}.bind(this),"html")},fetchCats:function(t){var e="?numOfResults=4&imageSize=all";return $.ajax(window.reqKitConstants.ApiCatIndex+e,{data:{emotion:t},headers:{Authorization:window.reqKitConstants.ApiKey}})},buildCatArray:function(t){return console.log(this),t.map(function(t){return this.generateCat(t)}.bind(this))},populateCatContainer:function(t){var e;this.cats=this.buildCatArray(t._items),e=this.cats.map(function(t){return this.indexTemplate(t)}.bind(this)),$(this.catContainer).html(e.join("")),console.log(this.cats)},update:function(t){this.fetchCats(t).then(function(t){this.populateCatContainer(t)}.bind(this))},viewCat:function(t){var e;this.cat=_.find(this.cats,function(e){return e.id===t}),e=this.showTemplate(this.cat),$("body").prepend(e),window.setTimeout(function(){$(".modal-overlay, .cat-modal").removeClass("invisible")},100)},closeCat:function(){$(".modal-overlay, .cat-modal").addClass("invisible"),window.setTimeout(function(){$(".modal-overlay, .cat-modal").remove()},500)}}),window.reqKitControllers.catNew=_.extend({},window.reqKitControllers.application,{fieldUrl:"#field-url",fieldEmotion:"#field-emotion",fieldOwner:"#field-owner",fieldApiKey:"#field-api-key",savedCats:[],initialize:function(){this.populateEmotionsSelect(this.fieldEmotion,"select one",!0)},postCatData:function(t,e){return $.ajax(window.reqKitConstants.ApiCatCreate,{method:"POST",data:JSON.stringify(t),headers:e,dataType:"json",contentType:"application/json",processData:!1})},handleSubmit:function(){var t={url:$(this.fieldUrl).val(),emotion:$(this.fieldEmotion).val(),owner:$(this.fieldOwner).val()},e={Authorization:$(this.fieldApiKey).val()};return $(".black-overlay").fadeIn(200),$(".submit").addClass("in-progress").text("Submitting..."),$(this.fieldEmotion+" option:selected").attr("value")?void this.postCatData(t,e).then(function(t){this.savedCats.push(t),$(".black-overlay").fadeOut(200),$(".submit").removeClass("in-progress").text("Submit Photo"),$("#field-url, #field-credit, #field-emotion").val(""),this.updateFlashMessage("Successfully saved cat!","success")}.bind(this),function(t){401===t.status&&this.updateFlashMessage("You need to be an administrator to add cats.","alert"),console.log("Oh no! Something bad happened:",t)}.bind(this)):(this.updateFlashMessage("Please select an emotion","alert"),!1)}}),window.reqKitControllers.userNew=_.extend({},window.reqKitControllers.application,{form:"#request-api-key-form",fieldEmail:"#request-api-key-email",fieldSubmit:"#request-api-key-submit",fieldSubmitIcon:"#request-api-key-icon",apiKeyContainer:".api-key-container",apiKeySpan:".api-key",apiKey:null,initialize:function(){},requestKey:function(t){return $.ajax(window.reqKitConstants.ApiUserCreate,{method:"POST",data:JSON.stringify(t),contentType:"application/json"})},updateState:function(t){"processing"===t?($(this.fieldEmail).addClass("shrunken"),$(this.fieldSubmit).addClass("sending"),$(this.fieldSubmitIcon).removeClass("fa-chevron-right").addClass("fa-cog fa-spin")):"error"===t?($(this.fieldEmail).val(""),$(this.fieldSubmit).addClass("error"),$(this.fieldSubmitIcon).removeClass("fa-cog fa-spin").addClass("fa-times"),window.setTimeout(function(){this.updateState("default")}.bind(this),3e3)):"completed"===t?($(this.fieldSubmit).addClass("completed"),$(this.fieldSubmitIcon).removeClass("fa-cog fa-spin").addClass("fa-check"),window.setTimeout(function(){$(this.form).slideUp(500)}.bind(this),1e3),window.setTimeout(function(){$(this.apiKeyContainer).fadeIn(500)}.bind(this),1500)):"default"===t&&($(this.fieldEmail).removeClass("shrunken"),$(this.fieldSubmit).removeAttr("class"),$(this.fieldSubmitIcon).attr("class","fa fa-chevron-right"))},handleSubmit:function(){var t={email:$(this.fieldEmail).val()};return t.email?(this.updateState("processing"),void this.requestKey(t).then(function(t){this.apiKey=t.api_key,$(this.apiKeySpan).text(this.apiKey),this.updateState("completed")}.bind(this),function(t){this.updateFlashMessage("Something went wrong T_T","alert"),this.updateState("error")}.bind(this))):(alert("We require an email, silly!"),!1)}}),$("header.full-ver h2").percentext({width:75,maxFontSize:130}),$("header.full-ver h5").percentext({width:78,maxFontSize:36}),$("header.smaller-ver h2").percentext({width:50,maxFontSize:100}),$("header.smaller-ver h5").percentext({width:55,maxFontSize:30}),$("#select-emotion").on("change",function(){$("section#demo").addClass("has-cats");var t=$(this).val();window.reqKitControllers.catIndex.update(t)});
//# sourceMappingURL=app.js.map