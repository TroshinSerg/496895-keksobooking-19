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
    getRandomArray: function (array) {
      var copyOfArray = array.slice();
      var randomArray = copyOfArray.filter(function (item, index, arr) {
        return index >= UTILS.getRandomNum(1, arr.length);
      });
      return randomArray;
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
