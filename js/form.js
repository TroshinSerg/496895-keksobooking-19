'use strict';

(function () {
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
  var MAX_ROOMS_COUNT = 100;
  var AD_FORM = document.forms[1];
  var FILTER_FORM = document.forms[0];

  var AD_FORM_NODES = AD_FORM.querySelectorAll('select, fieldset');
  var FILTER_FORM_NODES = FILTER_FORM.querySelectorAll('select, fieldset');

  var AD_FORM_SUBMIT = AD_FORM.querySelector('.ad-form__submit');
  var AD_FORM_RESET = AD_FORM.querySelector('.ad-form__reset');
  var INVALID_FIELD_BORDER_COLOR = 'red';
  var SELECT_NAME_TIMEIN = 'timein';
  var SELECT_NAME_TIMEOUT = 'timeout';
  var TITLE_MIN_LENGTH = 30;
  var isFormActive = false;

  var UTILS = {
    adForm: AD_FORM,
    deactivatePage: deactivatePage,
    changeState: changeStateForm,
    changeStateFilter: changeStateFilter,
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
    },
    {
      node: AD_FORM_RESET,
      eventType: 'click',
      handler: onAdFormResetClick
    }
  ];

  function changeStateForm() {
    if (isFormActive) {
      AD_FORM.classList.remove('ad-form--disabled');
      isFormActive = false;
    } else {
      AD_FORM.classList.add('ad-form--disabled');
      isFormActive = true;
    }
    AD_FORM_NODES.forEach(function (node) {
      node.disabled = isFormActive;
    });
  }

  function changeStateFilter(boolian) {
    FILTER_FORM_NODES.forEach(function (node) {
      node.disabled = boolian;
    });
  }

  function addFieldBorderColor(field) {
    field.style.borderColor = INVALID_FIELD_BORDER_COLOR;
  }

  function removeFieldBorderColor(field) {
    field.removeAttribute('style');
  }

  function onCapacityChange(evt) {
    var roomsCount = parseInt(AD_FORM.rooms.value, 10);
    var guestCount = parseInt(AD_FORM.capacity.value, 10);

    if (roomsCount !== MAX_ROOMS_COUNT && roomsCount < guestCount) {
      return setInvalidState(AD_FORM.capacity, ErrorMessage.MORE_GUEST);
    } else if (roomsCount === MAX_ROOMS_COUNT && guestCount !== 0) {
      return setInvalidState(AD_FORM.capacity, ErrorMessage.NOT_GUEST)
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

  function setInvalidState(target, message) {
    addFieldBorderColor(target);
    target.setCustomValidity(message);
    return false;
  }

  function onPriceInput(evt) {
    var typeValue = AD_FORM.type.value.toUpperCase();
    var currentValue = parseInt(AD_FORM.price.value, 10);

    if (currentValue < OfferTypeMinPrice[typeValue]) {
      return setInvalidState(evt.target, ErrorMessage.MIN_PRICE);
    } else if (currentValue > MAX_PRICE) {
      return setInvalidState(evt.target, ErrorMessage.MAX_PRICE);
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

  function onSuccessSend() {
    window.messages.renderSuccessPopup();
  }

  function onErrorSend() {
    window.messages.renderErrorPopup();
  }

  function onAdFormResetClick() {
    deactivatePage();
  }

  function onAdFormSubmit(evt) {
    evt.preventDefault();
    if (onTitleInput() && onPriceInput() && onCapacityChange()) {
      window.server(onErrorSend, onSuccessSend, new FormData(AD_FORM));
    }
  }

  function deactivatePage() {
    AD_FORM.classList.add('ad-form--disabled');
    AD_FORM.reset();
    AD_FORM.type.removeEventListener('change', onTypeChange);
    window.map.deactivate();
    window.map.onMapPopupCloseClick();
    changeStateForm();
    changeStateFilter(true);
  }

  changeStateForm();
  changeStateFilter(true);
  UTILS.addHandlers(HANDLERS);
  window.form = UTILS;
})();
