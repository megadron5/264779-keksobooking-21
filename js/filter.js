'use strict';

(function () {

  const MAX_SIMILAR_AD_COUNT = 5;

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapFilters = document.querySelector(`.map__filters`);
  const selectHousingType = mapFilters.querySelector(`#housing-type`);


  const currentFilter = {
    'housing-type': `any`
  };

  const isAny = function (filterValue) {
    return filterValue === `any`;
  };

  const is = function (elementValue, filterValue) {
    return isAny(filterValue) || elementValue === filterValue;
  };

  const getFilteredAds = function () {
    const outElements = [];
    for (let i = 0; i < window.similarAds.length && outElements.length !== MAX_SIMILAR_AD_COUNT; i++) {
      const similarAd = window.similarAds[i];
      if (!is(similarAd.offer.type, currentFilter[`housing-type`])) {
        continue;
      }
      outElements.push(similarAd);
    }
    return outElements;
  };


  const onSelectFilterChange = function (evt) {
    currentFilter[evt.target.name] = evt.target.value;
    let filteredAds = getFilteredAds();
    window.remove.removeCard();
    window.util.renderChildren(mapPins, filteredAds, window.map.renderPin, window.remove.removePins);
  };

  selectHousingType.addEventListener(`change`, onSelectFilterChange);

  window.filter = {
    getFilteredAds
  };


})();
