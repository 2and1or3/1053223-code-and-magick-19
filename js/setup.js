'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var wizards = [];

var getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var buildWizard = function (name, secondName, coat, eye) {
  return {
    name: name + ' ' + secondName,
    coatColor: coat,
    eyesColor: eye
  };
};

for (var i = 0; i < WIZARDS_COUNT; i++) {
  var randomName = NAMES[getRandom(NAMES.length)];
  var secondName = SECOND_NAMES[getRandom(SECOND_NAMES.length)];
  var coat = COATS[getRandom(COATS.length)];
  var eyes = EYES[getRandom(EYES.length)];

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
