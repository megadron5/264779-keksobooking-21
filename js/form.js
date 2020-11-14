'use strict';

(function () {

  const Form = {
    MIN_LENGTH_TITLE: 30,
    MAX_LENGTH_TITLE: 100
  };

  const MinPriceByType = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const adForm = document.querySelector(`.ad-form`);
  const roomsNumber = adForm.elements.room_number;
  const roomsCapacity = adForm.elements.capacity;
  const inputTitle = adForm.elements.title;
  const selectType = adForm.elements.type;
  const inputPrice = adForm.elements.price;
  const selectTimeIn = adForm.elements.timein;
  const selectTimeOut = adForm.elements.timeout;

  const validateTitle = function () {
    const valueLength = inputTitle.value.length;

    if (valueLength < Form.MIN_LENGTH_TITLE) {
      inputTitle.setCustomValidity(`Минимальная длина заголовка - 30 символов. Осталось еще ${Form.MIN_LENGTH_TITLE - valueLength} симв.`);
    } else if (valueLength > Form.MAX_LENGTH_TITLE) {
      inputTitle.setCustomValidity(`Максимальная длина заголовка - 100 символов. Удалите лишние ${valueLength - Form.MAX_LENGTH_TITLE} симв.`);
    } else {
      inputTitle.setCustomValidity(``);
    }

    inputTitle.reportValidity();
  };

  const validatePriceByType = function () {
    const type = selectType.value;
    const minPrice = MinPriceByType[type];

    if (type) {
      inputPrice.min = minPrice;
      inputPrice.placeholder = minPrice;
    }
  };

  const validateMinPriceByType = function () {
    const type = selectType.value;
    const minPrice = MinPriceByType[type];
    const currentPrice = inputPrice.value;

    if (currentPrice < minPrice) {
      inputPrice.setCustomValidity(`Минимальная цена для типа жилья ${selectType.options[selectType.selectedIndex].text} - ${minPrice} руб. за ночь.`);
    } else {
      inputPrice.setCustomValidity(``);
    }

    inputPrice.reportValidity();
  };


  const validateTimeInOut = function (isTimeIn) {
    if (isTimeIn) {
      selectTimeOut.value = selectTimeIn.value;
    } else {
      selectTimeIn.value = selectTimeOut.value;
    }
  };

  const validateRoomsCapacity = function (element) {
    const currentRooms = parseInt(roomsNumber.value, 10);
    const currentCapacity = parseInt(roomsCapacity.value, 10);

    if (currentRooms < currentCapacity) {
      element.setCustomValidity(`Для ${currentCapacity} гостей нужно минимум ${currentCapacity} комнаты`);
    } else if (currentRooms === 100 && currentCapacity !== 0) {
      element.setCustomValidity(`Для "100 комнат" нужно выбрать "не для гостей"`);
    } else if (currentRooms !== 100 && currentCapacity === 0) {
      element.setCustomValidity(`Не для гостей нужно выбрать 100 комнат`);
    } else {
      element.setCustomValidity(``);
    }

    element.reportValidity();
  };

  const onInputTitleInput = function () {
    validateTitle();
  };

  const onSelectTypeChange = function () {
    validatePriceByType();
  };

  const onInputPriceInput = function () {
    validateMinPriceByType();
  };

  const onSelectTimeInChange = function () {
    validateTimeInOut(true);
  };

  const onSelectTimeOutChange = function () {
    validateTimeInOut(false);
  };

  const onSelectRoomsChange = function () {
    validateRoomsCapacity(roomsNumber);
  };

  const onSelectCapacityChange = function () {
    validateRoomsCapacity(roomsCapacity);
  };


  const onFormChange = function (on) {
    if (on) {
      selectTimeIn.addEventListener(`change`, onSelectTimeInChange);
      selectTimeOut.addEventListener(`change`, onSelectTimeOutChange);
      selectType.addEventListener(`change`, onInputPriceInput);
      inputPrice.addEventListener(`input`, onInputPriceInput);
      selectType.addEventListener(`change`, onSelectTypeChange);
      inputTitle.addEventListener(`input`, onInputTitleInput);
      roomsNumber.addEventListener(`change`, onSelectRoomsChange);
      roomsCapacity.addEventListener(`change`, onSelectCapacityChange);
    } else {
      selectTimeIn.removeEventListener(`change`, onSelectTimeInChange);
      selectTimeOut.removeEventListener(`change`, onSelectTimeOutChange);
      selectType.removeEventListener(`change`, onInputPriceInput);
      inputPrice.removeEventListener(`input`, onInputPriceInput);
      selectType.removeEventListener(`change`, onSelectTypeChange);
      inputTitle.removeEventListener(`input`, onInputTitleInput);
      roomsNumber.removeEventListener(`change`, onSelectRoomsChange);
      roomsCapacity.removeEventListener(`change`, onSelectCapacityChange);
    }
  };

  adForm.addEventListener(`submit`, function (evt) {
    window.sync.sendData(new FormData(adForm), function () {
      window.disable.disablePage(true);
    });
    evt.preventDefault();
  });


  window.form = {
    onFormChange
  };

})();
