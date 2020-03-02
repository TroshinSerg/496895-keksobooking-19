'use strict';

(function () {
  var ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content;
  var SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content;
  var MAIN = document.querySelector('main');

  function onErrorPopupClick(evt) {
    MAIN.querySelector('.error').remove();
    evt.currentTarget.removeEventListener('click', onErrorPopupButtonClick);
    window.form.deactivatePage();
  }

  function onErrorPopupButtonClick(evt) {
    evt.preventDefault();
    event.stopPropagation();
    window.form.deactivatePage();
    MAIN.querySelector('.error').remove();
    evt.currentTarget.removeEventListener('click', onErrorPopupButtonClick);
  }

  function onSuccessPopupClick() {
    MAIN.querySelector('.success').remove();
    window.form.deactivatePage();
  }

  function onPopupEscKeydown(evt) {
    if (window.utils.isEsc(evt.keyCode)) {
      var popupClass = MAIN.querySelector('.success') ? '.success' : '.error';
      MAIN.querySelector(popupClass).remove();
      document.removeEventListener('keydown', onPopupEscKeydown);
      window.form.deactivatePage();
    }
  }

  function renderErrorPopup(messageText) {
    var clonedErrorPopup = ERROR_MESSAGE_TEMPLATE.cloneNode(true);
    if (messageText !== undefined) {
      clonedErrorPopup.querySelector('.error__message').textContent = messageText;
    }
    MAIN.appendChild(clonedErrorPopup);

    var errorPopup = MAIN.querySelector('.error');
    var errorBtn = errorPopup.querySelector('.error__button');

    errorPopup.addEventListener('click', onErrorPopupClick);
    errorBtn.addEventListener('click', onErrorPopupButtonClick);
    document.addEventListener('keydown', onPopupEscKeydown);
  }

  function renderSuccessPopup() {
    var clonedSuccesPopup = SUCCESS_MESSAGE_TEMPLATE.cloneNode(true);
    MAIN.appendChild(clonedSuccesPopup);

    var successPopup = MAIN.querySelector('.success');

    successPopup.addEventListener('click', onSuccessPopupClick);
    document.addEventListener('keydown', onPopupEscKeydown);
  }

  window.messages = {
    renderErrorPopup: renderErrorPopup,
    renderSuccessPopup: renderSuccessPopup
  };
})();
