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

  const resetPage = function () {
    window.disable.disablePage(true);
    adForm.reset();
    mapFilters.reset();
    moveToStartPosition();
    window.disable.getCoordMainPin();
    window.form.onFormChange(false);
  };


  const onResetButtonClick = function () {
    resetPage();
    window.dot.addEventListenerOnPin();
  };

  const onResetButtonPress = function (evt) {
    window.util.isEnterEvent(evt, resetPage);
  };

  const onResetButton = function () {
    resetButton.addEventListener(`click`, onResetButtonClick);
    resetButton.addEventListener(`click`, onResetButtonPress);
  };


  window.reset = {
    resetPage,
    onResetButton
  };


})();
