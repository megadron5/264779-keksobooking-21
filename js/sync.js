'use strict';

(function () {

  const sendURL = `https://21.javascript.pages.academy/keksobooking`;
  const getURL = `https://21.javascript.pages.academy/keksobooking/data`;
  const statusCode = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 1000;

  const sendData = function (data, onSucces) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSucces(xhr.response);
    });

    xhr.open(`POST`, sendURL);
    xhr.send(data);
  };

  const getData = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + +xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс.`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, getURL);
    xhr.send();
  };

  window.sync = {
    sendData,
    getData
  };

})();
