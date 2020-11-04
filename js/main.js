'use strict';

const Offer = {
  TITLES_OF: [`Домик`, `Квартира`, `Аппартаменты`, `Сарай`, `Чердак`, `Гостевой дом`],
  TYPE: [`palace`, `flat`, `house`, `bungalow`],
  CHECKIN: [`12:00`, `13:00`, `14:00`],
  CHECKOUT: [`12:00`, `13:00`, `14:00`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  DESCRIPTION_OF: [`Большой дом с трубой.`, `Хороший район.`, `Имеется площадка выгула собак.`, `В комплексе есть банька и купель.`],
  MIN_FEATURES: 0,
  PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
  MIN_PHOTOS: 1,
  MIN_PRICE: 500,
  MAX_PRICE: 5000,
  MIN_ROOMS: 1,
  MAX_ROOMS: 12,
  PERSON_PER_ROOM: 2,
  PHOTO_WIDTH: 45,
  PHOTO_HEIGHT: 40,
  PHOTO_ALT: `Фото жилья`
};

const types = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Дворец`,
  house: `Дом`
};

const MapSize = {
  MIN_WIDTH: 0,
  MAX_WIDTH: 1200,
  MIN_HEIGHT: 130,
  MAX_HEIGHT: 630,
};

const Pin = {
  WIDTH: 50,
  HEIGHT: 70,
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

const NUMBER_OF_ADS = 8;
const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const filtersContainer = map.querySelector(`.map__filters-container`);
const mainPin = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const roomsNumber = adForm.querySelector(`#room_number`);
const roomsCapacity = adForm.querySelector(`#capacity`);
const inputAdress = document.querySelector(`#address`);
const mapFilters = document.querySelector(`.map__filters`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

let rooms = Offer.MIN_ROOMS;

const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getAvatarUrl = function (i) {
  let urlId = String(i + 1).padStart(2, `0`);
  return `img/avatars/user${urlId}.png`;
};

const getAdAuthor = function (i) {
  let author = {
    avatar: getAvatarUrl(i)
  };
  return author;
};

const getRandomElement = function (elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

const getOfferRooms = function (minElement, maxElement) {
  rooms = getRandomIntInclusive(minElement, maxElement);
  return rooms;
};

const getOfferGuests = function () {
  return rooms * Offer.PERSON_PER_ROOM;
};

const getAdLocation = function () {
  const adLocation = {
    x: getRandomIntInclusive(MapSize.MIN_WIDTH, MapSize.MAX_WIDTH),
    y: getRandomIntInclusive(MapSize.MIN_HEIGHT, MapSize.MAX_HEIGHT)
  };
  return adLocation;
};

const getRandomLengthArray = function (minimumQuantity, elements) {
  const tailIndex = getRandomIntInclusive(minimumQuantity, elements.length);
  return elements.slice(0, tailIndex);
};

const getAdOffer = function (location) {
  let adOffer = {
    title: getRandomElement(Offer.TITLES_OF),
    address: location,
    price: getRandomIntInclusive(Offer.MIN_PRICE, Offer.MAX_PRICE),
    type: getRandomElement(Offer.TYPE),
    rooms: getOfferRooms(Offer.MIN_ROOMS, Offer.MAX_ROOMS),
    guests: getOfferGuests(),
    checkin: getRandomElement(Offer.CHECKIN),
    checkout: getRandomElement(Offer.CHECKOUT),
    features: getRandomLengthArray(Offer.MIN_FEATURES, Offer.FEATURES),
    description: getRandomElement(Offer.DESCRIPTION_OF),
    photos: getRandomLengthArray(Offer.MIN_PHOTOS, Offer.PHOTOS)
  };
  return adOffer;
};

const getAds = function () {
  const ads = [];

  for (let i = 0; i < NUMBER_OF_ADS; i++) {
    const location = getAdLocation();
    const similarAd = {
      author: getAdAuthor(i),
      offer: getAdOffer(location),
      location
    };
    ads.push(similarAd);
  }
  return ads;
};

const renderPin = function (pin) {
  const pinElement = pinTemplate.cloneNode(true);
  const pinX = pin.location.x - Pin.WIDTH / 2;
  const pinY = pin.location.y - Pin.HEIGHT;
  pinElement.style.left = `${pinX}px`;
  pinElement.style.top = `${pinY}px`;
  const avatarElement = pinElement.querySelector(`img`);
  avatarElement.src = pin.author.avatar;
  avatarElement.alt = pin.offer.title;

  return pinElement;
};

const removeChildren = function (element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
};


const createOfferFeature = function (element) {
  const childElement = document.createElement(`li`);
  childElement.classList.add(`popup__feature`, `popup__feature--${element}`);
  return childElement;
};

const createOfferImg = function (element) {
  const childElement = document.createElement(`img`);
  childElement.src = element;
  childElement.classList.add(`popup__photo`);
  childElement.width = Offer.PHOTO_WIDTH;
  childElement.height = Offer.PHOTO_HEIGHT;
  childElement.alt = Offer.PHOTO_ALT;

  return childElement;
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
    cardType.textContent = types[card.offer.type];
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

const renderCardOnMap = function (ad) {
  map.insertBefore(renderCard(ad), filtersContainer);
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


