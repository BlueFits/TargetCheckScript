if (typeof jQuery != "undefined") {
    checkForMissingIds();
  } else {
    console.log("jQuery is not present adding library");
    (function () {
      var script = document.createElement("SCRIPT");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js";
      script.type = "text/javascript";
      script.onload = function () {
        var $ = window.jQuery;
        checkForMissingIds();
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    })();
  }
  
  function checkForMissingIds() {
    var buttonAnchorError = { border: "5px solid yellow" };
    var missingIDError = { border: "5px solid green" };
    var malformedIDError = { border: "5px solid purple" };
    var duplicateIDError = { border: "5px solid orange" };
  
    var targetChecklist = {};
    var ttMETACheck = true;
    var adobeTargetCheck = true;
    var elsMissingIDs = [];
    var elementsToFind = [
      "section",
      "button",
      "a",
      "input[name='button']",
      "div",
      "ul",
      "ul > li",
      "table",
      "table tr",
    ];
    var elementsToInspect = [];
    var dupIDs = []
  
    function duplicateIDs() {
      Array.from($("main [id]")).forEach((el) => {
        const dups = $(`[id="${el.id}"]`);
        if (dups[1] === el) {
          dupIDs.push({duplicateID: `#${el.id}`}); 
          $(`#${el.id}`).css(duplicateIDError)
        }
      });
      if (dupIDs.length === 0) {
        targetChecklist.duplicateID = "No Duplicate IDs Detected";
      } else {
        console.table(dupIDs, ["duplicateID"]);
      }
    }
  
    try { ttMETA; }
    catch (e) {
      if (e.name == "ReferenceError") {
        ttMETACheck = false;
      }
    }
    if (!ttMETACheck) {
      targetChecklist.ttMETA = "FAIL: ttMETA object does not exist";
    } else {
      targetChecklist.ttMETA = "PASS: ttMETA object exists";
    }
  
    try { adobe; }
    catch (e) {
      if (e.name == "ReferenceError") {
        adobeTargetCheck = false;
      }
    }
    if (adobeTargetCheck && adobe.target) {
      if (parseFloat(adobe.target.VERSION) >= 2.0) {
        targetChecklist.adobeTarget =
          "PASS: adobe target version is 2.0 or higher";
      } else {
        targetChecklist.adobeTarget =
          "FAIL: target version incorrect; must be 2.0 or higher";
      }
    } else {
      targetChecklist.adobeTarget = "ERROR: no adobe target object exists";
    }
  
    elementsToFind.forEach((tagName) => {
      var els = $("main").find(tagName);
      if (els.length) {
        elementsToInspect.push(els);
      } else {
        console.log('no ' + tagName + ' of <main> to inspect')
      }
    });
  
    elementsToInspect.forEach((jQueryArray) => {
      jQueryArray.each(function () {
        inspectElement($(this));
      });
    });
  
    function inspectElement(jQueryEl) {
      var tagName = jQueryEl[0].tagName.toLowerCase();
      switch (tagName) {
        case "section":
          inspectDiv(jQueryEl, tagName);
        case "div":
          inspectDiv(jQueryEl, tagName);
          break;
        case "button":
          inspectLinks(jQueryEl, tagName);
          break;
        case "a":
          inspectLinks(jQueryEl, tagName);
          break;
        case "input":
          inspectLinks(jQueryEl, tagName);
          break;
        case "ul":
          inspectListParentEl(jQueryEl, tagName);
          break;
        case "li":
          inspectListItemEl(jQueryEl, tagName);
          break;
        case "table":
          checkElementID(jQueryEl, tagName);
          break;
        case "tr":
          checkElementID(jQueryEl, tagName);
          break;
        default:
          console.log("invalid jQueryEl", typeof tagName, tagName);
          break;
      }
    }
    function inspectDiv(divEl, tagName) {
      // if div's height same as child div's height, skip
      if (divEl.children() && divEl.height() === divEl.children().eq(0).height()) { 
        return;
        // find all divs that have two children or more
      } else if (divEl.children().length >= 2) {
        checkElementID(divEl, tagName);
      }
    }
  
    function inspectLinks(linkEl, tagName) {
      if (!linkEl.attr("id") && !linkEl.attr("data-ana")) {
        flagError(
          linkEl,
          "ID missing and data-ana",
          buttonAnchorError
        );
      }
  
      if (linkEl.attr("id") && !linkEl.attr("data-ana")) {
        checkElementID(linkEl, tagName);
      }
    }
  
    function inspectListParentEl(listParentEl, tagName) {
      if (!listParentEl.attr("id") && !listParentEl.parent().attr("id")) {
        flagError(listParentEl, "ID missing", missingIDError);
      }
      if (listParentEl.attr("id") && !listParentEl.parent().attr("id")) {
        checkElementID(listParentEl, tagName);
      }
    }
  
    function inspectListItemEl(listItemEl, tagName) {
      if (listItemEl.children().length >= 2) {
        if (
          !listItemEl.attr("id") &&
          !listItemEl.parent().attr("id") &&
          !listItemEl.parent().parent().attr("id")
        ) {
          flagError(listItemEl, "ID missing", missingIDError);
        }
      }
      if (
        listItemEl.attr("id") &&
        !listItemEl.parent().attr("id") &&
        !listItemEl.parent().parent().attr("id")
      ) {
        checkElementID(listItemEl, tagName);
      }
    }
  
    function checkElementID(element) {
      var id = element.attr("id");
      if (id) {
        if (/^pers/.test(id)) {
          return true;
        } else if (/^d/.test(id)) {
          flagError(element, "ID starts with a number", malformedIDError);
        }
      } else {
        flagError(element, "ID missing", missingIDError);
      }
    }
  
    function flagError(element, message, errorType) {
      var elementRef =
        element.get()[0] ||
        element.attr("class") ||
        element.attr("data-region") ||
        element.text();
      element.css(errorType);
      elsMissingIDs.push({element: elementRef, error: message});
    }
  
    function idToolTip() {
      $("main [id]").each(function (element) {
        var str =
          "ID is : " +
          $(this).attr("id") +
          "\nHTML tag is : " +
          $(this).prop("tagName");
        $(this).css("cursor", "pointer").addClass("tooltipID").attr("title", str);
      });
    }
    function buttonToolTip() {
      $("main a, button").each(function (element) {
        $(this).attr("title", "ID is : " + $(this).attr("id") + "\nData ana is : " + $(this).data("ana"));
      });
    }
  
    idToolTip();
    buttonToolTip();
    duplicateIDs();
    console.table(targetChecklist);
    console.table(elsMissingIDs, ["element", "error"]);
  }
  
