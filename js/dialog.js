'use strict';

(function (){
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenImg = setupOpen.querySelector('img');
  var setupClose = setup.querySelector('.setup-close');

  var onEscPress = function (evt) {
    if ((evt.keyCode === window.util.escKey) && (evt.target.tagName !== 'INPUT')) {
      setup.classList.add('hidden');
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var popupOpen = function (evt) {
    evt.preventDefault();

    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var popupClose = function (evt) {
    evt.preventDefault();

    setup.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };

  setupOpen.addEventListener('click', function (evt) {
    popupOpen(evt);
  });

  setupClose.addEventListener('click', function (evt) {
    popupClose(evt);
  });

  setupOpenImg.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.util.enterKey) {
      popupOpen(evt);
    }
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKey) {
      popupClose(evt);
    }
  });
})();
