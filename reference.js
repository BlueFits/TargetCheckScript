javascript:function checkForMissingIds(){var t={border:"5px solid yellow"},e={border:"5px solid green"},a={border:"5px solid purple"},r={border:"5px solid orange"},i={},n=!0,o=!0,s=[],c=[],d=[];try{ttMETA}catch(t){"ReferenceError"==t.name&&(n=!1)}i.ttMETA=n?"PASS: ttMETA object exists":"FAIL: ttMETA object does not exist";try{adobe}catch(t){"ReferenceError"==t.name&&(o=!1)}function l(t,e){t.children()&&t.height()===t.children().eq(0).height()||t.children().length>=2&&h(t)}function u(e,a){e.attr("id")||e.attr("data-ana")||p(e,"ID missing and data-ana",t),e.attr("id")&&!e.attr("data-ana")&&h(e)}function h(t){var r=t.attr("id");if(r){if(/^pers/.test(r))return!0;/^d/.test(r)&&p(t,"ID starts with a number",a)}else p(t,"ID missing",e)}function p(t,e,a){var r=t.get()[0]||t.attr("class")||t.attr("data-region")||t.text();t.css(a),s.push({element:r,error:e})}o&&adobe.target?parseFloat(adobe.target.VERSION)>=2?i.adobeTarget="PASS: adobe target version is 2.0 or higher":i.adobeTarget="FAIL: target version incorrect; must be 2.0 or higher":i.adobeTarget="ERROR: no adobe target object exists",["section","button","a","input[name=%27button%27]","div","ul","ul > li","table","table tr"].forEach(t=>{var e=$("main").find(t);e.length?c.push(e):console.log("no "+t+" of <main> to inspect")}),c.forEach(t=>{t.each(function(){!function(t){var a=t[0].tagName.toLowerCase();switch(a){case"section":l(t,a);case"div":l(t,a);break;case"button":case"a":case"input":u(t,a);break;case"ul":!function(t,a){t.attr("id")||t.parent().attr("id")||p(t,"ID missing",e);t.attr("id")&&!t.parent().attr("id")&&h(t)}(t);break;case"li":!function(t,a){t.children().length>=2&&(t.attr("id")||t.parent().attr("id")||t.parent().parent().attr("id")||p(t,"ID missing",e));!t.attr("id")||t.parent().attr("id")||t.parent().parent().attr("id")||h(t)}(t);break;case"table":case"tr":h(t);break;default:console.log("invalid jQueryEl",typeof a,a)}}($(this))})}),$("main [id]").each(function(t){var e="ID is : "+$(this).attr("id")+"\nHTML tag is : "+$(this).prop("tagName");$(this).css("cursor","pointer").addClass("tooltipID").attr("title",e)}),$("main a, button").each(function(t){$(this).attr("title","ID is : "+$(this).attr("id")+"\nData ana is : "+$(this).data("ana"))}),Array.from($("main [id]")).forEach(t=>{$(`[id="${t.id}"]`)[1]===t&&(d.push({duplicateID:`#${t.id}%60}),$(%60#${t.id}%60).css(r))}),0===d.length?i.duplicateID="No Duplicate IDs Detected":console.table(d,["duplicateID"]),console.table(i),console.table(s,["element","error"])}"undefined"!=typeof jQuery?checkForMissingIds():(console.log("jQuery is not present adding library"),function(){var t=document.createElement("SCRIPT");t.src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",t.type="text/javascript",t.onload=function(){window.jQuery;checkForMissingIds()},document.getElementsByTagName("head")[0].appendChild(t)}());
