"use strict";
(function () {

  const mainPin = document.querySelector(`.map__pin--main`);

  const onHandleMouseDown = function (evt) {
    window.util.isMainMouseButtonEvent(evt, window.activate.pageAct);
  };

  const onHandleKeyDown = function (evt) {
    window.util.isEnterEvent(evt, window.activate.pageAct);
  };

  const addEventListenerOnPin = function () {
    mainPin.addEventListener(`mousedown`, onHandleMouseDown);
    window.addEventListener(`keydown`, onHandleKeyDown);
  };

  const removeEventListenerOnPin = function () {
    mainPin.removeEventListener(`mousedown`, onHandleMouseDown);
    window.removeEventListener(`keydown`, onHandleKeyDown);
  };

  window.dot = {
    removeEventListenerOnPin,
    addEventListenerOnPin
  };

})();
