'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const ActiveMainPin = {
    WIDTH: 62,
    HEIGHT: 78,
    PROPORTION: 2
  };

  const DisabledMainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    PROPORTION: 2
  };


  const mapPins = map.querySelector(`.map__pins`);
  const adForm = document.querySelector(`.ad-form`);
  const inputAddress = adForm.elements.address;
  const mapFilters = document.querySelector(`.map__filters`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const changeFormState = function (form, isDisabled) {
    window.util.forEach(form.elements, function (formElement) {
      formElement.disabled = isDisabled;
    });
  };

  const getLocationMainPin = function (width, height, proportion) {
    const pinX = parseInt(mainPin.style.left, 10);
    const pinY = parseInt(mainPin.style.top, 10);
    const locationX = pinX + Math.ceil(width / proportion);
    const locationY = pinY + Math.ceil(height / proportion);

    return `${locationX}, ${locationY}`;
  };

  const disablePage = function (isDisabled) {
    if (isDisabled) {
      map.classList.add(`map--faded`);
      adForm.classList.add(`ad-form--disabled`);
    } else {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
    }

    changeFormState(adForm, isDisabled);
    changeFormState(mapFilters, isDisabled);

    inputAddress.value = getLocationMainPin(DisabledMainPin.WIDTH, DisabledMainPin.HEIGHT, DisabledMainPin.PROPORTION);
  };

  disablePage(true);

  const activatePage = function () {
    disablePage(false);
    inputAddress.value = getLocationMainPin(ActiveMainPin.WIDTH, ActiveMainPin.HEIGHT, ActiveMainPin.PROPORTION);

    window.form.onFormChange(true);

    const ads = window.data.getAds();

    window.util.renderChildren(mapPins, ads, window.map.renderPin, window.remove.removePins);
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