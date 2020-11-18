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

  const removeActivePin = function () {
    const activePin = map.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
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

    const showCard = function () {
      window.delete.removeCard();
      window.map.renderCard(pin);
    };

    const onPinElementClick = function () {
      showCard();
    };

    const onPinElementPress = function (evt) {
      window.util.isEnterEvent(evt, showCard);
    };

    pinElement.addEventListener(`click`, onPinElementClick);

    pinElement.addEventListener(`keydown`, onPinElementPress);

    return pinElement;
  };

  const renderCard = function (ad) {
    map.insertBefore(window.card.render(ad), filtersContainer);
  };

  window.map = {
    renderPin,
    renderCard,
    removeActivePin
  };

})();
