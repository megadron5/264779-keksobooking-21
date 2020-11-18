'use strict';

(function () {

  const MAX_SIMILAR_AD_COUNT = 5;
  const ANY_FILTER_VALUE = `any`;
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeSelect = mapFilters.querySelector(`#housing-type`);
  const housingPriceSelect = mapFilters.querySelector(`#housing-price`);
  const housingRoomsSelect = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsSelect = mapFilters.querySelector(`#housing-guests`);
  const featureFieldset = mapFilters.querySelector(`.map__features`);

  const createInitialFilters = function () {
    return {
      'housing-type': `any`,
      'housing-price': `any`,
      'housing-rooms': `any`,
      'housing-guests': `any`,
      'filter-wifi': `any`,
      'filter-dishwasher': `any`,
      'filter-parking': `any`,
      'filter-washer': `any`,
      'filter-elevator': `any`,
      'filter-conditioner': `any`
    };
  };

  let currentFilter = createInitialFilters();

  const resetCurrent = function () {
    currentFilter = createInitialFilters();
  };

  const rentalPrice = {
    any: {
      min: 0,
      max: Infinity},
    low: {
      min: 0,
      max: 9999},
    middle: {
      min: 10000,
      max: 49999},
    high: {
      min: 50000,
      max: Infinity}
  };

  const isAny = function (filterValue) {
    return filterValue === ANY_FILTER_VALUE;
  };

  const checkType = function (elementValue, filterValue) {
    return isAny(filterValue) || elementValue === filterValue;
  };

  const checkPrice = function (elementValue, filterValue) {
    let minPrice = rentalPrice[filterValue].min;
    let maxPrice = rentalPrice[filterValue].max;
    return isAny(filterValue) || (minPrice <= elementValue && elementValue <= maxPrice);
  };

  const checkNumbers = function (elementValue, filterValue) {
    if (filterValue !== ANY_FILTER_VALUE) {
      filterValue = parseInt(filterValue, 10);
    }
    return isAny(filterValue) || elementValue === filterValue;
  };

  const checkFeatures = function (elementValue, filterValue) {
    return isAny(filterValue) || elementValue.includes(filterValue);
  };

  const isSimilarAds = function (element) {
    return checkType(element.offer.type, currentFilter[`housing-type`])
      && checkPrice(element.offer.price, currentFilter[`housing-price`])
      && checkNumbers(element.offer.rooms, currentFilter[`housing-rooms`])
      && checkNumbers(element.offer.guests, currentFilter[`housing-guests`])
      && checkFeatures(element.offer.features, currentFilter[`filter-wifi`])
      && checkFeatures(element.offer.features, currentFilter[`filter-dishwasher`])
      && checkFeatures(element.offer.features, currentFilter[`filter-parking`])
      && checkFeatures(element.offer.features, currentFilter[`filter-washer`])
      && checkFeatures(element.offer.features, currentFilter[`filter-elevator`])
      && checkFeatures(element.offer.features, currentFilter[`filter-conditioner`]);
  };

  const filter = function (elements, cb, count) {
    const outElements = [];
    for (let i = 0; i < elements.length && outElements.length !== count; i++) {
      const element = elements[i];
      if (!cb(element, i, elements)) {
        continue;
      }
      outElements.push(element);
    }
    return outElements;
  };

  const getAds = function () {
    const ads = window.similarAds;
    return filter(ads, isSimilarAds, MAX_SIMILAR_AD_COUNT);
  };

  const changeCheckbox = function (evt) {
    currentFilter[evt.target.id] = currentFilter[evt.target.id] !== evt.target.value
      ? evt.target.value
      : ANY_FILTER_VALUE;
  };

  const renderFilteredAds = function () {
    const filteredAds = getAds();
    window.delete.removeCard();
    window.util.renderChildren(mapPins, filteredAds, window.map.renderPin, window.delete.removePins);
  };

  const renderFilteredAdsDebounced = window.debounce(renderFilteredAds);

  const onSelectFilterChange = function (evt) {
    if (evt.target.type === `checkbox`) {
      changeCheckbox(evt);
    } else {
      currentFilter[evt.target.name] = evt.target.value;
    }

    renderFilteredAdsDebounced();
  };

  housingTypeSelect.addEventListener(`change`, onSelectFilterChange);
  housingPriceSelect.addEventListener(`change`, onSelectFilterChange);
  housingRoomsSelect.addEventListener(`change`, onSelectFilterChange);
  housingGuestsSelect.addEventListener(`change`, onSelectFilterChange);
  featureFieldset.addEventListener(`change`, onSelectFilterChange);

  window.filter = {
    resetCurrent,
    getAds
  };

})();
