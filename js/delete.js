'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const removeCard = function () {
    const card = document.querySelector(`.popup`);
    if (card) {
      card.remove();
    }
    document.removeEventListener(`keydown`, window.card.onEscClose);
    window.map.removeActivePin();
  };
  const removeChildren = function (element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  };

  const removePins = function () {
    const pins = document.querySelectorAll(`.map__pin`);
    pins.forEach(function (pin) {
      if (pin !== mainPin) {
        pin.remove();
      }
    });
  };

  window.delete = {
    removeCard,
    removeChildren,
    removePins
  };

})();
