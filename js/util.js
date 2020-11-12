'use strict';

(function () {
  const Keycode = {
    ESC: 27,
    ENTER: 13,
    MAIN_MOUSE_BUTTON: 0
  };

  const isEscEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ESC) {
      action();
    }
  };

  const isEnterEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ENTER) {
      action();
    }
  };

  const isMainMouseButtonEvent = function (evt, action) {
    if (evt.button === Keycode.MAIN_MOUSE_BUTTON) {
      action();
    }
  };

  const getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomElement = function (elements) {
    return elements[window.util.getRandomIntInclusive(0, elements.length - 1)];
  };

  const getMaxElement = function (elements) {
    const maxElement = elements[0];

    for (let i = 1; i < elements.length; i++) {
      maxElement = Math.max(maxElement, elements[i]);
    }

    return maxElement;
  };

  const renderChildren = function (parentNode, elements, renderChild, clear = window.remove.removeChildren) {
    clear(parentNode);
    const fragment = document.createDocumentFragment();
    elements.forEach(function (element) {
      const childNode = renderChild(element);
      fragment.appendChild(childNode);
    });
    parentNode.appendChild(fragment);
  };

  const forEach = function (elements, cb) {
    return Array.prototype.forEach.call(elements, cb);
  };

  window.util = {
    isEscEvent,
    isEnterEvent,
    isMainMouseButtonEvent,
    getRandomIntInclusive,
    getRandomElement,
    getMaxElement,
    renderChildren,
    forEach
  };

})();
