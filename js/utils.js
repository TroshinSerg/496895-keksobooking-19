'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
    SPACE: 32
  };

  function getRandomNum(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function getRandomElement(array, isRemove) {
    var randomIndex = getRandomNum(0, array.length - 1);
    return (isRemove) ? array.splice(randomIndex, 1).toString() : array[randomIndex];
  }

  function getZeroOrOne() {
    return Math.floor(Math.random() * 2);
  }

  function getRandomArray(array) {
    return array.filter(getZeroOrOne);
  }

  function pluralize(num, endings) {
    var remainder = num % 100;
    if (remainder === 0 || remainder > 4 && remainder !== 1) {
      return endings[2];
    } else if (remainder === 1) {
      return endings[1];
    }
    return endings[0];
  }

  function isEnterKeyCode(keyCode) {
    return keyCode === KeyCode.ENTER;
  }

  function isSpaceKeyCode(keyCode) {
    return keyCode === KeyCode.SPACE;
  }

  function isEscKeyCode(keyCode) {
    return keyCode === KeyCode.ESC;
  }

  window.utils = {
    getRandomNum: getRandomNum,
    getRandomElement: getRandomElement,
    getZeroOrOne: getZeroOrOne,
    getRandomArray: getRandomArray,
    pluralize: pluralize,
    isEnter: isEnterKeyCode,
    isSpace: isSpaceKeyCode,
    isEsc: isEscKeyCode
  };
})();
