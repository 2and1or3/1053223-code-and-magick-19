'use strict';
(function () {
  var WIZARDS_COUNT = 4;

  var similarWizardTemplate =
  document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var renderWizard = function (wizardData) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var wizardName = wizardElement.querySelector('.setup-similar-label');
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');
    wizardName.textContent = wizardData.name;
    wizardCoat.style.fill = wizardData.colorCoat;
    wizardEyes.style.fill = wizardData.colorEyes;

    return wizardElement;
  };

  var render = function (data) {
    var fragment = document.createDocumentFragment();
    similarListElement.innerHTML = '';

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarListElement.appendChild(fragment);

    document.querySelector('.setup-similar')
      .classList.remove('hidden');
  };

  window.render = render;
})();
