'use strict';

(function () {
  var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIRE_BALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var setColor = function (element, property, input, color) {
    element.style[property] = color;
    input.value = color;
  };

  var setup = document.querySelector('.setup');
  var setupCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupCoatInput = setup.querySelector('input[name="coat-color"]');

  setupCoat.addEventListener('click', function () {
    var newColor = COATS[window.util.getRandom(COATS.length - 1)];
    setColor(setupCoat, 'fill', setupCoatInput, newColor);
    wizard.onCoatChange(newColor);
  });

  var setupEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupEyesInput = setup.querySelector('input[name="eyes-color"]');

  setupEyes.addEventListener('click', function () {
    var newColor = EYES[window.util.getRandom(EYES.length - 1)];
    setColor(setupEyes, 'fill', setupEyesInput, newColor);
    wizard.onEyesChange(newColor);
  });

  var setupBall = setup.querySelector('.setup-fireball-wrap');
  var setupBallInput = setupBall.querySelector('input[name="fireball-color"]');

  setupBall.addEventListener('click', function () {
    setColor(setupBall, 'backgroundColor', setupBallInput, FIRE_BALLS[window.util.getRandom(FIRE_BALLS.length - 1)]);
  });

  window.setup = {
    wizard: wizard,
    dialog: setup
  };
})();
