'use strict';

(function () {

  const MIN_VALUE_HERE = 0;
  const MAX_VALUE_HERE = 100;

  const Form = {
    MIN_LENGTH_TITLE: 30,
    MAX_LENGTH_TITLE: 100
  };

  const MIN_PRICE_BY_TYPE = {
    BUNGALOW: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
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
    const minPrice = MIN_PRICE_BY_TYPE[type];

    if (type) {
      inputPrice.min = minPrice;
      inputPrice.placeholder = minPrice;
    }
  };

  const validateMinPriceByType = function () {
    const type = selectType.value;
    const minPrice = MIN_PRICE_BY_TYPE[type];
    const currentPrice = parseInt(inputPrice.value, 10);

    if (currentPrice < minPrice) {
      inputPrice.setCustomValidity(`Минимальная цена для типа жилья  ${selectType.options[selectType.selectedIndex].text} - ${minPrice} руб. за ночь. Увеличьте цену на ${minPrice - currentPrice} руб.`);
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

  const validateRoomsCapacity = function () {
    const currentRooms = Number(roomsNumber.value);
    const currentCapacity = Number(roomsCapacity.value);
    if (currentCapacity !== MIN_VALUE_HERE && currentCapacity > currentRooms) {
      roomsCapacity.setCustomValidity(`Количество гостей не должно превышать количество комнат.`);
      roomsCapacity.reportValidity();
    } else if (currentCapacity !== MIN_VALUE_HERE && currentRooms === MAX_VALUE_HERE) {
      roomsCapacity.setCustomValidity(`Не для гостей нужно выбрать 100 комнат`);
      roomsCapacity.reportValidity();
    } else if (currentCapacity === MIN_VALUE_HERE && currentRooms !== MAX_VALUE_HERE) {
      roomsCapacity.setCustomValidity(`Пригласите гостей.`);
      roomsCapacity.reportValidity();
    } else {
      roomsCapacity.setCustomValidity(``);
    }
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

  const onChange = function (on) {
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

  const onSuccessSendData = function () {
    window.sync.servload(new FormData(adForm), function () {
      window.reset.pageRes();
      window.popup.showSucces();
      window.dot.addEventListenerOnPin();
    });
  };

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    onSuccessSendData();
  });


  window.form = {
    onChange
  };

})();
