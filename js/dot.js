"use strict";
(function () {

  const mainPin = document.querySelector(`.map__pin--main`);

  const handleMouseDown = function (evt) {
    window.util.isMainMouseButtonEvent(evt, window.activate.activatePage);
  };

  const handleKeyDown = function (evt) {
    window.util.isEnterEvent(evt, window.activate.activatePage);
  };

  const addEventListenerOnPin = function () {
    mainPin.addEventListener(`mousedown`, handleMouseDown);
    window.addEventListener(`keydown`, handleKeyDown);
  };

  const removeEventListenerOnPin = function () {
    mainPin.removeEventListener(`mousedown`, handleMouseDown);
    window.removeEventListener(`keydown`, handleKeyDown);
  };

  window.dot = {
    removeEventListenerOnPin,
    addEventListenerOnPin
  };

})();
