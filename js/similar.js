'use strict';
(function () {
  var COAT_WEIGHT = 2;
  var EYES_WEIGHT = 1;
  var DEBOUNCE_TIME = 500;

  var getRank = function (wizard) {
    var rank = 0;

    if (window.setup.currentCoat === wizard.colorCoat) {
      rank += COAT_WEIGHT;
    }

    if (window.setup.currentEyes === wizard.colorEyes) {
      rank += EYES_WEIGHT;
    }

    return rank;
  };

  var lastTimeout;

  var debounce = function (func, data) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(function () {
      func(data);
    }, DEBOUNCE_TIME);
  };

  var updateWizards = function () {

    window.similar.wizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });

    debounce(window.render, window.similar.wizards);
  };

  window.similar = {
    wizards: [],
    update: updateWizards
  };

})();
