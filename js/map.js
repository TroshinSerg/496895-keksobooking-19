'use strict';

(function () {
  var MAP = document.querySelector('.map');
  var MAP_PIN_LIST = MAP.querySelector('.map__pins');
  var MAP_MAIN_PIN = MAP.querySelector('.map__pin--main');

  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;

  var MainPin = {
    DEFAULT_X: parseFloat(MAP_MAIN_PIN.style.left),
    DEFAULT_Y: parseFloat(MAP_MAIN_PIN.style.top),
    SIZE: 65,
    SIZE_WITH_POINT: 77,
    HALF_SIZE: 33,
    HALF_SIZE_WITH_POINT: 55
  };

  var KEYCODES = {
    esc: 27,
    enter: 13,
    space: 32
  };

  var HANDLERS = [
    {
      node: MAP_MAIN_PIN,
      eventType: 'mousedown',
      handler: onMapPinMainMousedown
    },
    {
      node: MAP_MAIN_PIN,
      eventType: 'keydown',
      handler: onMapPinMainKeydown
    },
  ];

  function onMapPopupCloseClick() {
    removePinActiveClass();
    removeMapPopup();
    document.removeEventListener('keydown', onMapPopupEscPress);
  }

  function onMapPinClick(evt) {
    evt.preventDefault();
    var currentPin = evt.currentTarget;
    window.map.onMapPopupCloseClick();
    window.card.renderMapPopup(window.loadedData[currentPin.dataset.id]);
    currentPin.classList.add('map__pin--active');
    document.addEventListener('keydown', onMapPopupEscPress);
  }

  function deactivateMap() {
    var pins = MAP_PIN_LIST.querySelectorAll('.map__pin:not(.map__pin--main)');
    MAP.classList.add('map--faded');
    MAP_MAIN_PIN.style.top = MainPin.DEFAULT_Y + 'px';
    MAP_MAIN_PIN.style.left = MainPin.DEFAULT_X + 'px';

    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function onSuccess(data) {
    window.loadedData = data;
    renderMapElements(window.loadedData);
    window.form.changeStateFilter(false);
  }

  function onError(errorMessage) {
    window.messages.renderErrorPopup(errorMessage);
  }

  function renderMapElements(data) {
    MAP_PIN_LIST.appendChild(window.pin.render(data));
  }

  function onMapPinMainKeydown(evt) {
    if (evt.keyCode === KEYCODES.enter || evt.keyCode === KEYCODES.space) {
      activatePage();
    }
  }

  function onMapPinMainMousedown(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDrag = false;
    var limitDragArea = getLimitDragArea(MAP_PIN_LIST);

    function onMapPinMainMousemove(moveEvt) {
      moveEvt.preventDefault();
      isDrag = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var currentCoords = {
        x: MAP_MAIN_PIN.offsetLeft - shift.x,
        y: MAP_MAIN_PIN.offsetTop - shift.y
      };

      if (currentCoords.y >= limitDragArea.minY && currentCoords.y <= MAP_MAX_Y) {
        startCoords.y = moveEvt.clientY;
        MAP_MAIN_PIN.style.top = currentCoords.y + 'px';
        setAddressField(MainPin.SIZE_WITH_POINT);
      }

      if (currentCoords.x >= limitDragArea.minX && currentCoords.x <= limitDragArea.maxX) {
        startCoords.x = moveEvt.clientX;
        MAP_MAIN_PIN.style.left = currentCoords.x + 'px';
        setAddressField(MainPin.SIZE_WITH_POINT);
      }
    }

    function onMapPinMainMouseup(upEvt) {
      upEvt.preventDefault();

      if (isDrag) {
        var onMapPinMainClickPreventDefault = function (evtPrevDef) {
          evtPrevDef.preventDefault();
          MAP_MAIN_PIN.removeEventListener('click', onMapPinMainClickPreventDefault);
        };
      }

      MAP_MAIN_PIN.addEventListener('click', onMapPinMainClickPreventDefault);
      document.removeEventListener('mousemove', onMapPinMainMousemove);
      document.removeEventListener('mouseup', onMapPinMainMouseup);
    }

    document.addEventListener('mousemove', onMapPinMainMousemove);
    document.addEventListener('mouseup', onMapPinMainMouseup);
    setAddressField(MainPin.SIZE_WIDTH_POINT);

    if (MAP.classList.contains('map--faded')) {
      activatePage();
      window.server(onError, onSuccess);
    }
  }

  function activatePage() {
    MAP.classList.remove('map--faded');
    window.form.changeState();
    window.form.changePriceField();
  }

  function setAddressField(offsetFromCenter) {
    var topCoord = parseFloat(MAP_MAIN_PIN.style.top);
    var left = parseFloat(MAP_MAIN_PIN.style.left);
    var top = (offsetFromCenter !== undefined) ? topCoord + offsetFromCenter : topCoord;
    window.form.adForm.address.value = (left + MainPin.HALF_SIZE) + ', ' + (top + MainPin.HALF_SIZE);
  }

  function getLimitDragArea(area) {
    var values = {
      minX: -MainPin.HALF_SIZE,
      maxX: area.offsetWidth - MainPin.HALF_SIZE,
      minY: MAP_MIN_Y - MainPin.SIZE_WITH_POINT + MainPin.SIZE_WITH_POINT
    };

    return values;
  }

  function onMapPopupEscPress(evt) {
    if (evt.keyCode === KEYCODES.esc) {
      onMapPopupCloseClick();
    }
  }

  function removeMapPopup() {
    var mapPopup = MAP.querySelector('.popup');
    if (mapPopup) {
      MAP.removeChild(mapPopup);
      document.removeEventListener('keydown', onMapPopupEscPress);
    }
    return false;
  }

  function removePinActiveClass() {
    var pin = MAP_PIN_LIST.querySelector('.map__pin--active');
    if (pin) {
      pin.classList.remove('map__pin--active');
    }
  }

  setAddressField();
  window.form.addHandlers(HANDLERS);
  window.map = {
    MAP: MAP,
    mapMainPin: MAP_MAIN_PIN,
    MainPin: MainPin,
    deactivate: deactivateMap,
    onMapPopupCloseClick: onMapPopupCloseClick,
    onMapPinClick: onMapPinClick
  };
})();
