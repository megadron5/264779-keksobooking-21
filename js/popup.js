'use strict';

(function () {

  const main = document.querySelector(`main`);
  const mainPin = main.querySelector(`.map__pin--main`);
  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);

  const successTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);

  const onClick = function (popup) {
    window.util.isClickEvent(removePopup.bind(null, popup));
  };

  const onEscPress = function (popup, evt) {
    window.util.isEscEvent(evt, removePopup.bind(null, popup));
  };

  const onPopupButtonPress = function (popup, evt) {
    window.util.isEnterEvent(evt, removePopup.bind(null, popup));
  };

  const removePopup = function (popup) {
    if (popup) {
      popup.remove();
    }
    mainPin.addEventListener(`mousedown`, window.activate.handleMouseDown);
    mainPin.addEventListener(`keydown`, window.activate.handleKeyDown);
    mainPin.disabled = false;
  };

  const renderPopup = function (message, template, messageContainerSelector, buttonSelector) {
    const popup = template.cloneNode(true);

    if (message) {
      const messageContainer = popup.querySelector(messageContainerSelector);
      messageContainer.textContent = message;
    }

    mainPin.removeEventListener(`mousedown`, window.activate.handleMouseDown);
    mainPin.removeEventListener(`keydown`, window.activate.handleKeyDown);
    mainPin.disabled = true;

    if (buttonSelector) {
      const button = popup.querySelector(buttonSelector);
      button.addEventListener(`keydown`, onPopupButtonPress.bind(null, popup));
    }

    document.addEventListener(`mousedown`, onClick.bind(null, popup));
    document.addEventListener(`keydown`, onEscPress.bind(null, popup));

    main.insertAdjacentElement(`afterbegin`, popup);
  };

  const onError = function (errorMessage) {
    renderPopup(errorMessage, errorTemplate, `.error__message`, `.error__button`);
  };

  const showSuccesPopup = function () {
    renderPopup(null, successTemplate, null, null);
  };

  window.popup = {
    onError,
    showSuccesPopup
  };

})();
