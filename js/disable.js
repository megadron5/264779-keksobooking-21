'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const inputAddress = adForm.elements.address;
  const mapFilters = document.querySelector(`.map__filters`);

  const DisabledMainPin = {
    WIDTH: 62,
    HEIGHT: 78,
    PROPORTION: 2
  };

  const getLocationMainPin = function (width, height, proportion) {
    const pinX = parseInt(mainPin.style.left, 10);
    const pinY = parseInt(mainPin.style.top, 10);
    const locationX = pinX + Math.ceil(width / proportion);
    const locationY = pinY + height;

    return `${locationX}, ${locationY}`;
  };

  const changeFormState = function (form, isDisabled) {
    window.util.forEach(form.elements, function (formElement) {
      formElement.disabled = isDisabled;
    });
  };

  const getCoordMainPin = function () {
    inputAddress.value = getLocationMainPin(DisabledMainPin.WIDTH, DisabledMainPin.HEIGHT, DisabledMainPin.PROPORTION);
  };

  const page = function (isDisabled) {
    if (isDisabled) {
      map.classList.add(`map--faded`);
      adForm.classList.add(`ad-form--disabled`);
      window.delete.removePins();
      window.delete.removeCard();
    } else {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
    }

    changeFormState(adForm, isDisabled);
    changeFormState(mapFilters, isDisabled);
    getCoordMainPin();
  };

  window.disable = {
    page,
    getCoordMainPin
  };

})();
