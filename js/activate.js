'use strict';

(function () {
  const mapPins = document.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const onSuccess = function (ads) {
    window.similarAds = ads;
    const filteredAds = window.filter.getFilteredAds();
    window.util.renderChildren(mapPins, filteredAds, window.map.renderPin, window.remove.removePins);
    window.disable.disablePage(false);
    window.form.onFormChange(true);
    window.reset.onResetButton();
    window.dot.removeEventListenerOnPin();
    mainPin.disabled = false;
  };

  const activatePage = function () {
    window.sync.load(onSuccess);
  };

  window.dot.addEventListenerOnPin();

  window.disable.disablePage(true);

  window.activate = {
    activatePage
  };

})();
