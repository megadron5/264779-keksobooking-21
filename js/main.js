'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);

  window.disable.disablePage(true);

  const successHandler = function (ads) {
    window.util.renderChildren(mapPins, ads, window.map.renderPin, window.remove.removePins);
    window.disable.disablePage(false);
    window.form.onFormChange(true);

    mainPin.removeEventListener(`mousedown`, handleMouseDown);
    mainPin.removeEventListener(`keydown`, handleKeyDown);
  };

  const errorHandler = function (errorMessage) {
    const errorPopup = errorTemplate.cloneNode(true);
    const errorMessageContainer = errorPopup.querySelector(`.error__message`);
    errorPopup.style.position = `absolute`;
    errorPopup.style.left = 0;
    errorPopup.style.right = 0;
    errorMessageContainer.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorPopup);
  };

  const activatePage = function () {
    window.sync.getData(successHandler, errorHandler);
  };

  const handleKeyDown = function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  };

  const handleMouseDown = function (evt) {
    window.util.isMainMouseButtonEvent(evt, activatePage);
  };

  mainPin.addEventListener(`mousedown`, handleMouseDown);
  window.addEventListener(`keydown`, handleKeyDown);

})();
