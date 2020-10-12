'use strict';

const TITLES_OF = [`Домик`, `Квартира`, `Аппартаменты`, `Сарай`, `Чердак`, `Гостевой дом`];
const TYPES_OF = [`palace`, `flat`, `house`, `bungalow`];
const TIME_INOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES_OF = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION_OF = [`Большой дом с трубой.`, `Хороший район.`, `Имеется площадка выгула собак.`, `В комплексе есть банька и купель.`];
const PHOTOS_OF = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const QUANTITY = 8;
const Price = {
    min: 3000,
    max: 250000
};
const Rooms ={
    min: 1,
    max 15
};
const Guests = {
    min: 1,
    max: 30
};
const locationY = {
    min: 130,
    max: 630
};
const myMap = document,querySelector(`.map`);
myMap.classList.remove(`.map--faded`);
const myPins = document.querySelector(`.map__pins`);
const advertNew = document.querySelector(`#pin`).content;

const getMyNumber = (min, max) => Math.round(Math.random() * (max - min)) + min;
const getMyElement = (items) => items[Math.floor(Math.random() * items.length)];
const getMyNumber = (num) => Math.round(num / 1000) * 1000;

const getAdvert = () => {
  const mapX = getMyNumber(0, myMap.offsetWidth);
  const mapY = getMyNumber(locationY.min, locationY.max);
return {
    author: {
      avatar: `img/avatars/user0${getMyNumber(1, QUANTITY)}.png`
    },
    offer: {
      title: getMyElement(TITLES_OF),
      address: `${mapX}, ${mapY}`,
      price: getMyNumber(getMyNumber(Price.min, Price.max)),
      type: getMyElement(TYPES_OF),
      rooms: getMyNumber(Rooms.min, Rooms.max),
      guests: getMyNumber(Guests.min, Guests.max),
      checkin: getMyElement(TIME_INOUT),
      checkout: getMyElement(TIME_INOUT),
      features: FEATURES_OF.slice(0, getMyNumber(0, FEATURES_OF.length)),
      description: getMyElement(DESCRIPTION_OF),
      photos: getMyElement(PHOTOS_OF)
    },
    location: {
      x: mapX,
      y: mapY
    }
  };
};

const AdvertsGen = (quantity) => {
  const adverts = [];
  for (let i = 0; i < quantity; i++) {
    adverts.push(getAdvert());
  }
  return adverts;
};

const createPin = (pinData) => {
  const pinElement = advertNew.cloneNode(true);
  const pinButton = pinElement.querySelector(`.map__pin`);
  const pinPhoto = pinElement.querySelector(`img`);
  pinButton.style.left = `${pinData.location.x - pinButton.offsetWidth}px`;
  pinButton.style.top = `${pinData.location.y - pinButton.offsetHeight}px`;
  pinPhoto.src = pinData.photos.of;
  pinPhoto.alt = pinData.title.of;

  return pinElement;
};

const fragment = document.createDocumentFragment();

AdvertsGen(QUANTITY).forEach((pin) => {
  fragment.appendChild(createPin(pin));
});
pinsList.appendChild(fragment); 

