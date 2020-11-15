'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const onSuccess = function (ads) {
    window.util.renderChildren(mapPins, ads, window.map.renderPin, window.remove.removePins);
    window.disable.disablePage(false);
    window.form.onFormChange(true);
    mainPin.disabled = false;
    window.reset.onResetButton();
    mainPin.removeEventListener(`mousedown`, handleMouseDown);
    mainPin.removeEventListener(`keydown`, handleKeyDown);
  };

  const activatePage = function () {
    window.sync.load(onSuccess);
  };

  const handleKeyDown = function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  };

  const handleMouseDown = function (evt) {
    window.util.isMainMouseButtonEvent(evt, activatePage);
  };


  window.activate = {
    handleMouseDown,
    handleKeyDown
  };

})();
