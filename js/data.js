'use strict';

(function () {

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

const MapSize = {
  MIN_WIDTH: 0,
  MAX_WIDTH: 1200,
  MIN_HEIGHT: 130,
  MAX_HEIGHT: 630,
};

const NUMBER_OF_ADS = 8;

let rooms = Offer.MIN_ROOMS;

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

window.data = {
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
  }
};


})();