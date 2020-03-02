'use strict';

(function () {
  var PIN_NUMBERS = 5;
  var HOUSING_TYPE = document.querySelector('#housing-type');
  var HOUSING_PRICE = document.querySelector('#housing-price');
  var HOUSING_ROOMS = document.querySelector('#housing-rooms');
  var HOUSING_GUESTS = document.querySelector('#housing-guests');
  var FEATURES = document.querySelectorAll('.map__checkbox');

  function checkTypeFilter(item) {
    return HOUSING_TYPE.value === 'any' || HOUSING_TYPE.value === item.offer.type;
  }

  function filter() {
    return window.loadedData.filter(checkTypeFilter).slice(0, PIN_NUMBERS);
  }

  window.filter = {
    start: filter
  };
})();
