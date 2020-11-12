'use strict';

(function () {

  const Pin = {
  	WIDTH: 50,
  	HEIGHT: 70,
};

const map = document.querySelector(`.map`);
const filtersContainer = map.querySelector(`.map__filters-container`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

window.map = {
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
},

const renderCardOnMap = function (ad) {
  map.insertBefore(renderCard(ad), filtersContainer);
  },
};

})();