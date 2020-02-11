'use strict';

(function (){
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIRE_BALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  var wizards = [];

  var buildWizard = function (name, secondName, coat, eye) {
    return {
      name: name + ' ' + secondName,
      coatColor: coat,
      eyesColor: eye
    };
  };

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    var randomName = NAMES[window.util.getRandom(NAMES.length - 1)];
    var secondName = SECOND_NAMES[window.util.getRandom(SECOND_NAMES.length - 1)];
    var coat = COATS[window.util.getRandom(COATS.length - 1)];
    var eyes = EYES[window.util.getRandom(EYES.length - 1)];

    var wizard = buildWizard(randomName, secondName, coat, eyes);
    wizards.push(wizard);
  }

  var similarWizardTemplate =
  document.querySelector('#similar-wizard-template').content
  .querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  var renderWizard = function (wizardData) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var wizardName = wizardElement.querySelector('.setup-similar-label');
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');
    wizardName.textContent = wizardData.name;
    wizardCoat.style.fill = wizardData.coatColor;
    wizardEyes.style.fill = wizardData.eyesColor;

    return wizardElement;
  };

  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar')
  .classList.remove('hidden');

  var setColor = function (element, property, input, color) {
    element.style[property] = color;
    input.value = color;
  };

  var setup = document.querySelector('.setup');
  var setupCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupCoatData = setup.querySelector('input[name="coat-color"]');

  setupCoat.addEventListener('click', function () {
    setColor(setupCoat, 'fill', setupCoatData, COATS[window.util.getRandom(COATS.length - 1)]);
  });

  var setupEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupEyesData = setup.querySelector('input[name="eyes-color"]');

  setupEyes.addEventListener('click', function () {
    setColor(setupEyes, 'fill', setupEyesData, EYES[window.util.getRandom(EYES.length - 1)]);
  });

  var setupBall = setup.querySelector('.setup-fireball-wrap');
  var setupBallData = setupBall.querySelector('input[name="fireball-color"]');

  setupBall.addEventListener('click', function () {
    setColor(setupBall, 'backgroundColor', setupBallData, FIRE_BALLS[window.util.getRandom(FIRE_BALLS.length - 1)]);
  });
})();
