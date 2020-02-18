'use strict';

(function () {
  var FORMS_NODES = document.querySelectorAll('form > select, form > fieldset');

  var ErrorMessage = {
    MORE_GUEST: 'Гостей больше, чем комнат!',
    NOT_GUEST: 'Не для гостей!',
    MIN_PRICE: 'Цена ниже минимальной!',
    MAX_PRICE: 'Цена больше максимальной!'
  };

  var OfferTypeMinPrice = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };

  var MAX_PRICE = 1000000;
  var AD_FORM = document.forms[1];
  var AD_FORM_SUBMIT = AD_FORM.querySelector('.ad-form__submit');
  var INVALID_FIELD_BORDER_COLOR = 'red';
  var SELECT_NAME_TIMEIN = 'timein';
  var SELECT_NAME_TIMEOUT = 'timeout';
  var TITLE_MIN_LENGTH = 30;

  var UTILS = {
    adForm: AD_FORM,
    formsNodes: FORMS_NODES,
    enableElements: function (htmlCollection) {
      htmlCollection.forEach(function (node) {
        node.removeAttribute('disabled');
      });
    },
    changePriceField: function () {
      var typeValue = AD_FORM.type.value.toUpperCase();
      AD_FORM.price.min = OfferTypeMinPrice[typeValue];
      AD_FORM.price.placeholder = OfferTypeMinPrice[typeValue];
    },
    addHandlers: function (handlers) {
      handlers.forEach(function (item) {
        item.node.addEventListener(item.eventType, item.handler);
      });
    }
  };

  var HANDLERS = [
    {
      node: AD_FORM.type,
      eventType: 'change',
      handler: onTypeChange
    },
    {
      node: AD_FORM.timein,
      eventType: 'change',
      handler: onTimeSelectsChange
    },
    {
      node: AD_FORM.timeout,
      eventType: 'change',
      handler: onTimeSelectsChange
    },
    {
      node: AD_FORM.title,
      eventType: 'input',
      handler: onTitleInput
    },
    {
      node: AD_FORM.type,
      eventType: 'change',
      handler: onPriceInput
    },
    {
      node: AD_FORM.price,
      eventType: 'input',
      handler: onPriceInput
    },
    {
      node: AD_FORM.rooms,
      eventType: 'change',
      handler: onCapacityChange
    },
    {
      node: AD_FORM.capacity,
      eventType: 'change',
      handler: onCapacityChange
    },
    {
      node: AD_FORM_SUBMIT,
      eventType: 'click',
      handler: onAdFormSubmit
    }
  ];

  function disableElements(htmlCollection) {
    htmlCollection.forEach(function (node) {
      node.disabled = 'disabled';
    });
  }

  function addFieldBorderColor(field) {
    field.style.borderColor = INVALID_FIELD_BORDER_COLOR;
  }

  function removeFieldBorderColor(field) {
    field.removeAttribute('style');
  }

  function onCapacityChange() {
    var roomsCount = +AD_FORM.rooms.value;
    var guestCount = +AD_FORM.capacity.value;

    if (roomsCount !== 100 && roomsCount < guestCount) {
      addFieldBorderColor(AD_FORM.capacity);
      AD_FORM.capacity.setCustomValidity(ErrorMessage.MORE_GUEST);
      return false;
    } else if (roomsCount === 100 && guestCount !== 0) {
      addFieldBorderColor(AD_FORM.capacity);
      AD_FORM.capacity.setCustomValidity(ErrorMessage.NOT_GUEST);
      return false;
    }
    removeFieldBorderColor(AD_FORM.capacity);
    AD_FORM.capacity.setCustomValidity('');
    return true;
  }

  function onTitleInput() {
    var titleFieldValue = AD_FORM.title.value.trim();
    if (!titleFieldValue || titleFieldValue.length < TITLE_MIN_LENGTH) {
      addFieldBorderColor(AD_FORM.title);
      return false;
    }
    removeFieldBorderColor(AD_FORM.title);
    return true;
  }

  function onTypeChange() {
    UTILS.changePriceField();
    onPriceInput();
  }

  function onPriceInput() {
    var typeValue = AD_FORM.type.value.toUpperCase();
    var currentValue = +AD_FORM.price.value;

    if (currentValue < OfferTypeMinPrice[typeValue]) {
      addFieldBorderColor(AD_FORM.price);
      AD_FORM.price.setCustomValidity(ErrorMessage.MIN_PRICE);
      return false;
    } else if (currentValue > MAX_PRICE) {
      addFieldBorderColor(AD_FORM.price);
      AD_FORM.price.setCustomValidity(ErrorMessage.MAX_PRICE);
      return false;
    }
    removeFieldBorderColor(AD_FORM.price);
    AD_FORM.price.setCustomValidity('');
    return true;
  }

  function onTimeSelectsChange(evt) {
    var currentSelectName = evt.currentTarget.name;
    var selectName = currentSelectName === SELECT_NAME_TIMEIN ? SELECT_NAME_TIMEOUT : SELECT_NAME_TIMEIN;
    AD_FORM[selectName][AD_FORM[currentSelectName].selectedIndex].selected = true;
  }

  function onAdFormSubmit(evt) {
    if (!onTitleInput() && !onPriceInput() && !onCapacityChange()) {
      evt.preventDefault();
    }
  }

  disableElements(FORMS_NODES);
  UTILS.addHandlers(HANDLERS);
  window.form = UTILS;
})();
