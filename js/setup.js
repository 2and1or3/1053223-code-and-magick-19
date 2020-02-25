'use strict';

(function () {
  var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIRE_BALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


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
    window.similar.wizards = data.slice();

    window.render(window.similar.wizards);
  };

  window.backend.load(onSuccessUpload, onError);

  var setColor = function (element, property, input, color) {
    element.style[property] = color;
    input.value = color;

    window.setup.currentEyes = setupEyes.style.fill;
    window.setup.currentCoat = setupCoat.style.fill;
  };

  var setup = document.querySelector('.setup');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupCoatData = setup.querySelector('input[name="coat-color"]');

  setupCoat.addEventListener('click', function () {
    setColor(setupCoat, 'fill', setupCoatData, COATS[window.util.getRandom(COATS.length - 1)]);
    window.similar.update();
  });

  var setupEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupEyesData = setup.querySelector('input[name="eyes-color"]');

  setupEyes.addEventListener('click', function () {
    setColor(setupEyes, 'fill', setupEyesData, EYES[window.util.getRandom(EYES.length - 1)]);
    window.similar.update();
  });

  var setupBall = setup.querySelector('.setup-fireball-wrap');
  var setupBallData = setupBall.querySelector('input[name="fireball-color"]');

  setupBall.addEventListener('click', function () {
    setColor(setupBall, 'backgroundColor', setupBallData, FIRE_BALLS[window.util.getRandom(FIRE_BALLS.length - 1)]);
  });

  var setupButton = setup.querySelector('.setup-submit');

  var onSuccessSend = function () {
    var initialText = setupButton.textContent;

    var setupReset = function () {
      setupButton.textContent = initialText;
      setup.classList.add('hidden');
    };

    setupButton.textContent = 'Данные отправлены...';
    setTimeout(setupReset, 1000);
  };

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), onSuccessSend, onError);
    evt.preventDefault();
  });

  window.setup = {
    currentCoat: null,
    currentEyes: null
  };
})();
