'use strict';

(function () {

  const Offer = {
    PHOTO_WIDTH: 45,
    PHOTO_HEIGHT: 40,
    PHOTO_ALT: `Фото жилья`
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

  window.data = {
    createOfferFeature,
    createOfferImg
  };

})();
