'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;

  function wrapText(context, textLine, marginLeft, marginTop, maxWidth, lineHeight) {
    var words = textLine.split(' ');
    var countWords = words.length;
    var line = '';
    for (var n = 0; n < countWords; n++) {
      var testLine = line + words[n] + ' ';
      var testWidth = context.measureText(testLine).width;
      if (testWidth > maxWidth) {
        context.fillText(line, marginLeft, marginTop);
        line = words[n] + ' ';
        marginTop += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, marginLeft, marginTop);
  }

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var getRandom = function (max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
  };

  var getPercentPositionX = function (absoluteChild) {
    var parent = absoluteChild.offsetParent;

    return ((absoluteChild.getBoundingClientRect().x + absoluteChild.offsetWidth / 2) / parent.offsetWidth) * 100;
  };

  window.util = {
    wrapText: wrapText,
    getMaxElement: getMaxElement,
    getRandom: getRandom,
    getPercentPositionX: getPercentPositionX,
    enterKey: ENTER_KEY,
    escKey: ESC_KEY
  };
})();
