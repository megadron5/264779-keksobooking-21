'use strict';

(function () {

  const TIMEOUT_IN_MS = 10000;

  const Urls = {
    ONLOAD: `https://21.javascript.pages.academy/keksobooking`,
    LOAD: `https://21.javascript.pages.academy/keksobooking/data`
  };

  const StatusCode = {
    OK: 200
  };

  const Methods = {
    GET: `GET`,
    POST: `POST`
  };

  const checkStatusCode = function (xhr, onSuccess, onError) {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  };

  const checkConnectError = function (xhr, onError) {
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
  };

  const checkTimeoutError = function (xhr, onError) {
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс.`);
    });
  };


  const request = function (URL, onSuccess, onError, method = Methods.GET, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      checkStatusCode(xhr, onSuccess, onError);
      onSuccess(xhr.response);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    checkConnectError(xhr, onError);
    checkTimeoutError(xhr, onError);

    xhr.open(method, URL);
    xhr.send(data);
  };

  const onload = function (data, onSuccess) {
    request(Urls.ONLOAD, onSuccess, window.popup.onError, Methods.POST, data);
  };

  const load = function (onSuccess) {
    request(Urls.LOAD, onSuccess, window.popup.onError, Methods.GET, null);
  };


  window.sync = {
    onload,
    load
  };

})();
