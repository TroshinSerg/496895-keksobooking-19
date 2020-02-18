'use strict';

(function () {
  var ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content;
  var SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content;
  var MAIN = document.querySelector('main');

  var KEYCODES = {
    esc: 27,
    enter: 13,
    space: 32
  };

  function onErrorPopupClick(evt) {
    MAIN.querySelector('.error').remove();
    evt.currentTarget.removeEventListener('click', onErrorPopupButtonClick);
  }

  function onErrorPopupButtonClick(evt) {
    evt.preventDefault();
    MAIN.querySelector('.error').remove();
    evt.currentTarget.removeEventListener('click', onErrorPopupButtonClick);
  }

  function onSuccessPopupClick() {
    MAIN.querySelector('.success').remove();
  }

  function onPopupEscKeydown(evt) {
    if (evt.keyCode === KEYCODES.esc) {
      if (MAIN.querySelector('.success')) {
        MAIN.querySelector('.success').remove();
      } else {
        MAIN.querySelector('.error').remove();
      }
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  }

  window.messages = {
    createErrorPopup: function (messageText) {
      var clonedErrorPopup = ERROR_MESSAGE_TEMPLATE.cloneNode(true);
      clonedErrorPopup.querySelector('.error__message').textContent = messageText;
      MAIN.appendChild(clonedErrorPopup);

      var errorPopup = MAIN.querySelector('.error');
      var errorBtn = errorPopup.querySelector('.error__button');

      errorPopup.addEventListener('click', onErrorPopupClick);
      errorBtn.addEventListener('click', onErrorPopupButtonClick);
      document.addEventListener('keydown', onPopupEscKeydown);
    },
    createSuccessPopup: function () {
      var clonedSuccesPopup = SUCCESS_MESSAGE_TEMPLATE.cloneNode(true);
      MAIN.appendChild(clonedSuccesPopup);

      var successPopup = MAIN.querySelector('.success');

      successPopup.addEventListener('click', onSuccessPopupClick);
      document.addEventListener('keydown', onPopupEscKeydown);
    }
  };
})();
