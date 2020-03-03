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

  function checkRoomsFilter(item) {
    return HOUSING_ROOMS.value === any || parseInt(HOUSING_ROOMS.value, 10) === item.offer.rooms;
  }
  
  function checkGuestsFilter(item) {
    return HOUSING_GUESTS.value === any || parseInt(HOUSING_GUESTS.value, 10) === item.offer.guests;
  }

  function getChecked() {
    var checkedFeatures = [];
    FEATURES.forEach(function (feature) {
      if (feature.checked) {
        checkedFeatures.push(feature);
      }
    });
    return checkedFeatures;
  }

  function checkFeaturesFirter(item) {
    var checkedFeatures = getChecked();
    return checkedFeatures.every(function (feature) {
      return item.offer.features.includes(feature.value);
    });
  }

  function filter() {
    return window.loadedData.filter(function (item) {
      return checkTypeFilter(item) && checkPriceFilter(item) && checkRoomsFilter(item) && checkGuestsFilter(item) && checkFeaturesFirter(item);
    }).slice(0, PIN_NUMBERS);
  }

  window.filter = {
    start: filter
  };
})();
