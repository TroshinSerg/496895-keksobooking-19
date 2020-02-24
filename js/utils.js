'use strict';

(function () {
  var UTILS = {
    getRandomNum: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomElement: function (array, isRemove) {
      var randomIndex = this.getRandomNum(0, array.length - 1);
      return (isRemove) ? array.splice(randomIndex, 1).toString() : array[randomIndex];
    },
    getZeroOrOne: function () {
      return Math.floor(Math.random() * 2);
    },
    getRandomArray: function (array) {
      return array.filter(this.getZeroOrOne);
    },
    pluralize: function (num, endings) {
      var remainder = num % 100;
      if (remainder === 0 || remainder > 4 && remainder !== 1) {
        return endings[2];
      } else if (remainder === 1) {
        return endings[1];
      }
      return endings[0];
    }
  };

  window.utils = UTILS;
})();
