'use strict';

(function () {

  const mainPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const resetButton = adForm.querySelector(`.ad-form__reset`);
  const mapFilters = document.querySelector(`.map__filters`);

  const MainPinStartCoords = {
    Y: 375,
    X: 570
  };

  const moveToStartPosition = function () {
    mainPin.style.left = `${MainPinStartCoords.X}px`;
    mainPin.style.top = `${MainPinStartCoords.Y}px`;
  };

  const pageRes = function () {
    window.disable.page(true);
    adForm.reset();
    mapFilters.reset();
    moveToStartPosition();
    window.disable.getCoordMainPin();
    window.form.onChange(false);
  };

  const onResetButtonClick = function () {
    pageRes();
    window.dot.addEventListenerOnPin();
  };

  const onResetButtonPress = function (evt) {
    window.util.isEnterEvent(evt, pageRes);
  };

  const addListenerOnResetButton = function () {
    resetButton.addEventListener(`click`, onResetButtonClick);
    window.addEventListener(`keydown`, onResetButtonPress);
  };

  window.reset = {
    pageRes,
    addListenerOnResetButton
  };


})();
