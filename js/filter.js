'use strict';

(function () {
  var PIN_NUMBERS = 5;
  var HOUSING_TYPE = document.querySelector('#housing-type');
  var HOUSING_PRICE = document.querySelector('#housing-price');
  var HOUSING_ROOMS = document.querySelector('#housing-rooms');
  var HOUSING_GUESTS = document.querySelector('#housing-guests');
  var FEATURES = document.querySelectorAll('.map__checkbox');

  var any = 'any';

  var HousingPriceValue = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var Price = {
    TEN: 10000,
    FIFTY: 50000
  };

  function checkTypeFilter(item) {
    return HOUSING_TYPE.value === any || HOUSING_TYPE.value === item.offer.type;
  }

  function checkPriceFilter(item) {
    return HOUSING_PRICE.value === any || ((HOUSING_PRICE.value === HousingPriceValue.MIDDLE) && (item.offer.price > Price.TEN && item.offer.price < Price.FIFTY)) || ((HOUSING_PRICE.value === HousingPriceValue.LOW) && (item.offer.price < Price.TEN)) || ((HOUSING_PRICE.value === HousingPriceValue.HIGH) && (item.offer.price > Price.FIFTY));
  }

  function filter() {
    return window.loadedData.filter(function (item) {
      return checkTypeFilter(item) && checkPriceFilter(item);
    }).slice(0, PIN_NUMBERS);
  }

  window.filter = {
    start: filter
  };
})();