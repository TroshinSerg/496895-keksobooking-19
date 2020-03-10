'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ALT_TEXT = 'Фото жилья ';
  var PREVIEW_WIDTH = 70;

  function checkFileType(fileName) {
    return FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
  }

  function renderImg(src, fileName) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = ALT_TEXT + fileName;
    img.width = PREVIEW_WIDTH;
    return img;
  }

  function renderPreview(fileChoiser, preview) {
    var file = fileChoiser.files[0];
    var fileName = file.name.toLowerCase();
    var previewImg = preview.querySelector('img');

    if (checkFileType(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (previewImg) {
          previewImg.src = reader.result;
        } else {
          preview.appendChild(renderImg(reader.result, fileName));
        }
      });

      reader.readAsDataURL(file);
    }
  }

  window.fileUpload = {
    start: renderPreview
  };
})();
