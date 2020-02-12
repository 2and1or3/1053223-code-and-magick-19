'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenImg = setupOpen.querySelector('img');
  var setupClose = setup.querySelector('.setup-close');
  var setupMovePoint = setup.querySelector('.upload');


  var startPosition = {
    x: null,
    y: null
  };

  var refreshPosition = function () {
    if (!startPosition.x) {
      startPosition.x = window.util.getPercentPositionX(setup);
      startPosition.y = setup.getBoundingClientRect().y;
    }

    setup.style.left = startPosition.x + '%';
    setup.style.top = startPosition.y + 'px';
  };

  var onEscPress = function (evt) {
    if ((evt.keyCode === window.util.escKey) && (evt.target.tagName !== 'INPUT')) {
      setup.classList.add('hidden');
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var popupOpen = function (evt) {
    evt.preventDefault();

    setup.classList.remove('hidden');
    refreshPosition();
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


  setupMovePoint.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          setupMovePoint.removeEventListener('click', onClickPreventDefault);
        };
        setupMovePoint.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
