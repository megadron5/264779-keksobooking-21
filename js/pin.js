"use strict";

(function () {

  const ActiveMainPin = {
    WIDTH: 62,
    HEIGHT: 78,
    PROPORTION: 2
  };

  const MapSize = {
    MIN_WIDTH: 0,
    MAX_WIDTH: 1200,
    MIN_HEIGHT: 130,
    MAX_HEIGHT: 630,
  };

  const mainPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const inputAddress = adForm.elements.address;
  const coordinateBorderMinX = MapSize.MIN_WIDTH - (ActiveMainPin.WIDTH / ActiveMainPin.PROPORTION);
  const coordinateBorderMaxX = MapSize.MAX_WIDTH - (ActiveMainPin.WIDTH / ActiveMainPin.PROPORTION);

  const getLocationActiveMainPin = function (coordX, coordY, widthPin, heightPin, proportion) {
    const locationX = coordX + Math.ceil(widthPin / proportion);
    const locationY = coordY + heightPin;

    return `${locationX}, ${locationY}`;
  };

  const writeCoord = function (currentCoordX, currentCoordY) {
    mainPin.style.left = currentCoordX + `px`;
    mainPin.style.top = currentCoordY + `px`;

    inputAddress.value = getLocationActiveMainPin(
        currentCoordX,
        currentCoordY,
        ActiveMainPin.WIDTH,
        ActiveMainPin.HEIGHT,
        ActiveMainPin.PROPORTION
    );
  };

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const getCoords = function (typeEvt) {

      const shift = {
        x: startCoords.x - typeEvt.clientX,
        y: startCoords.y - typeEvt.clientY
      };

      startCoords = {
        x: typeEvt.clientX,
        y: typeEvt.clientY
      };

      let currentCoordX = mainPin.offsetLeft - shift.x;

      if (currentCoordX < coordinateBorderMinX) {
        currentCoordX = coordinateBorderMinX;
      } else if (currentCoordX > coordinateBorderMaxX) {
        currentCoordX = coordinateBorderMaxX;
      }

      let currentCoordY = mainPin.offsetTop - shift.y;

      if (currentCoordY < MapSize.MIN_HEIGHT - ActiveMainPin.HEIGHT) {
        currentCoordY = MapSize.MIN_HEIGHT - ActiveMainPin.HEIGHT;
      } else if (currentCoordY > MapSize.MAX_HEIGHT - ActiveMainPin.HEIGHT) {
        currentCoordY = MapSize.MAX_HEIGHT - ActiveMainPin.HEIGHT;
      }

      writeCoord(currentCoordX, currentCoordY);
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getCoords(moveEvt);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getCoords(upEvt);

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
