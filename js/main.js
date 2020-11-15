'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);

  window.disable.disablePage(true);

  mainPin.addEventListener(`mousedown`, window.activate.handleMouseDown);
  window.addEventListener(`keydown`, window.activate.handleKeyDown);

})();
