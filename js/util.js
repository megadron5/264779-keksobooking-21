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

  const isClickEvent = function (action) {
    action();
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

  const renderChildren = function (parentNode, elements, renderChild, clear = window.delete.removeChildren) {
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
    isClickEvent,
    isEnterEvent,
    isMainMouseButtonEvent,
    renderChildren,
    forEach
  };

})();
