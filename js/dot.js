"use strict";
(function () {

  const mainPin = document.querySelector(`.map__pin--main`);

  const onMainPinClick = function (evt) {
    window.util.isMainMouseButtonEvent(evt, window.activate.pageAct);
  };

  const onMainPinPress = function (evt) {
    window.util.isEnterEvent(evt, window.activate.pageAct);
  };

  const addEventListenerOnPin = function () {
    mainPin.addEventListener(`mousedown`, onMainPinClick);
    window.addEventListener(`keydown`, onMainPinPress);
  };

  const removeEventListenerOnPin = function () {
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    window.removeEventListener(`keydown`, onMainPinPress);
  };

  window.dot = {
    removeEventListenerOnPin,
    addEventListenerOnPin
  };

})();
