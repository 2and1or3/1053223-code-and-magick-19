'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';
  var statusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 5000;

  var makeRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
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

    return xhr;
  };

  var load = function (onLoad, onError) {
    var request = makeRequest(onLoad, onError);

    request.open('GET', GET_URL);
    request.send();
  };

  var save = function (data, onLoad, onError) {
    var request = makeRequest(onLoad, onError);

    request.open('POST', POST_URL);
    request.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
