'use strict';

(function () {
  const mapPins = document.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const onSuccess = function (ads) {
    window.similarAds = ads;
    const filteredAds = window.filter.getAds();
    window.util.renderChildren(mapPins, filteredAds, window.map.renderPin, window.delete.removePins);
    window.disable.page(false);
    window.form.onChange(true);
    window.reset.addListenerOnResetButton();
    window.dot.removeEventListenerOnPin();
    mainPin.disabled = false;
  };

  const pageAct = function () {
    window.sync.load(onSuccess);
  };

  window.dot.addEventListenerOnPin();

  window.disable.page(true);

  window.activate = {
    pageAct
  };

})();
