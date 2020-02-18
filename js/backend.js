'use strict';

(function () {

  var URL_FROM = 'https://js.dump.academy/code-and-magick/data';
  var URL_TO = 'https://js.dump.academy/code-and-magick';
  var statusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var formLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время выполнение запроса: ' + xhr.timeout + ' MS');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL_FROM);
    xhr.send();
  };

  var formSave = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время выполнение запроса: ' + xhr.timeout + ' MS');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL_TO);
    xhr.send(data);
  };

  window.backend = {
    load: formLoad,
    save: formSave
  };
})();
