'use strict';

(function () {

  const MAX_SIMILAR_AD_COUNT = 5;
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapFilters = document.querySelector(`.map__filters`);
  const selectHousingType = mapFilters.querySelector(`#housing-type`);
  const selectHousingPrice = mapFilters.querySelector(`#housing-price`);
  const selectHousingRooms = mapFilters.querySelector(`#housing-rooms`);
  const selectHousingGuests = mapFilters.querySelector(`#housing-guests`);
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

  const resetCurrentFilter = function () {
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
    return filterValue === `any`;
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
    if (filterValue !== `any`) {
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


  const getFilteredAds = function () {
    const ads = window.similarAds;
    return filter(ads, isSimilarAds, MAX_SIMILAR_AD_COUNT);
  };

  const changeCheckbox = function (evt) {
    currentFilter[evt.target.id] = currentFilter[evt.target.id] !== evt.target.value
      ? evt.target.value
      : `any`;
  };

  const renderFilteredAds = function () {
    const filteredAds = getFilteredAds();
    window.remove.removeCard();
    window.util.renderChildren(mapPins, filteredAds, window.map.renderPin, window.remove.removePins);
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

  selectHousingType.addEventListener(`change`, onSelectFilterChange);
  selectHousingPrice.addEventListener(`change`, onSelectFilterChange);
  selectHousingRooms.addEventListener(`change`, onSelectFilterChange);
  selectHousingGuests.addEventListener(`change`, onSelectFilterChange);
  featureFieldset.addEventListener(`change`, onSelectFilterChange);

  window.filter = {
    resetCurrentFilter,
    getFilteredAds
  };

})();
