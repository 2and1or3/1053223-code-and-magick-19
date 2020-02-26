'use strict';
(function () {
  var COAT_WEIGHT = 2;
  var EYES_WEIGHT = 1;

  var wizards = [];
  var coatColor;
  var eyesColor;

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSuccessUpload = function (data) {
    wizards = data.slice();

    window.render(wizards);
  };

  window.backend.load(onSuccessUpload, onError);

  var setupForm = document.querySelector('.setup-wizard-form');
  var setupButton = setupForm.querySelector('.setup-submit');

  var onSuccessSend = function () {
    var initialText = setupButton.textContent;

    var setupReset = function () {
      setupButton.textContent = initialText;
      window.setup.dialog.classList.add('hidden');
    };

    setupButton.textContent = 'Данные отправлены...';
    setTimeout(setupReset, 1000);
  };

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), onSuccessSend, onError);
    evt.preventDefault();
  });

  var getRank = function (wizard) {
    var rank = 0;

    if (coatColor === wizard.colorCoat) {
      rank += COAT_WEIGHT;
    }

    if (eyesColor === wizard.colorEyes) {
      rank += EYES_WEIGHT;
    }

    return rank;
  };

  var updateWizards = function () {

    wizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });

    window.render(wizards);
  };

  window.setup.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.setup.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

})();
