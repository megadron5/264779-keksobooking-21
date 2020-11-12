'use strict';

const Types = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Дворец`,
  house: `Дом`
};

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
const roomsNumber = adForm.querySelector(`#room_number`);
const roomsCapacity = adForm.querySelector(`#capacity`);
const inputAdress = document.querySelector(`#address`);
const mapFilters = document.querySelector(`.map__filters`);

const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = function (elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

const renderChildren = function (parentNode, elements, renderChild, clear = removeChildren) {
  clear(parentNode);
  const fragment = document.createDocumentFragment();
  elements.forEach(function (element) {
    const childNode = renderChild(element);
    fragment.appendChild(childNode);
  });

  parentNode.appendChild(fragment);
};

const renderCard = function (card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(`.popup__title`);
  const cardPrice = cardElement.querySelector(`.popup__text--price`);
  const cardType = cardElement.querySelector(`.popup__type`);
  const cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
  const cardTime = cardElement.querySelector(`.popup__text--time`);
  const cardDescription = cardElement.querySelector(`.popup__description`);
  const cardAvatar = cardElement.querySelector(`.popup__avatar`);

  if (card.offer.title) {
    cardTitle.textContent = card.offer.title;
  }
  if (card.offer.price) {
    cardPrice.textContent = `${card.offer.price}₽/ночь`;
  }
  if (card.offer.type) {
    cardType.textContent = Types[card.offer.type];
  }
  if (card.offer.rooms) {
    cardCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  }
  if (card.offer.checkin && card.offer.checkout) {
    cardTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  }

  renderChildren(
      cardElement.querySelector(`.popup__features`),
      card.offer.features,
      createOfferFeature
  );

  cardDescription.textContent = card.offer.description;

  renderChildren(
      cardElement.querySelector(`.popup__photos`),
      card.offer.photos,
      createOfferImg
  );

  cardAvatar.src = card.author.avatar;

  return cardElement;
};

const forEach = function (elements, cb) {
  return Array.prototype.forEach.call(elements, cb);
};

const changeFormState = function (form, isDisabled) {
  forEach(form.elements, function (formElement) {
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

  inputAdress.value = getLocationMainPin(DisabledMainPin.WIDTH, DisabledMainPin.HEIGHT, DisabledMainPin.PROPORTION);
};

disablePage(true);

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

const onSelectRoomsChange = function () {
  validateRoomsCapacity(roomsNumber);
};

const onSelectCapacityChange = function () {
  validateRoomsCapacity(roomsCapacity);
};

const onFormChange = function (on) {
  if (on) {
    roomsNumber.addEventListener(`change`, onSelectRoomsChange);
    roomsCapacity.addEventListener(`change`, onSelectCapacityChange);
  } else {
    roomsNumber.removeEventListener(`change`, onSelectRoomsChange);
    roomsCapacity.removeEventListener(`change`, onSelectCapacityChange);
  }
};

const activatePage = function () {
  disablePage(false);
  inputAdress.value = getLocationMainPin(ActiveMainPin.WIDTH, ActiveMainPin.HEIGHT, ActiveMainPin.PROPORTION);
  mainPin.addEventListener(`click`, onFormChange);
  const ads = getAds();
  renderChildren(mapPins, ads, renderPin);
  renderCardOnMap(ads[0]);
  window.removeEventListener(`keydown`, handleKeyDown);
  mainPin.removeEventListener(`mousedown`, handleMouseDown);
};

function handleKeyDown(evt) {
  if (evt.key === `Enter`) {
    activatePage();
  }
}
function handleMouseDown(evt) {
  if (evt.which === 1) {
    activatePage();
  }
}

mainPin.addEventListener(`mousedown`, handleMouseDown);
window.addEventListener(`keydown`, handleKeyDown);


