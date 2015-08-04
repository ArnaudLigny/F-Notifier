(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var inputLandingPage = document.getElementById('landingPage');
    var inputLandingPageIfNotif = document.getElementById('landingPageIfNotif');
    var inputIsSound = document.getElementById('isSound');

    // Apply translations
    function applyTranslations() {
      var objects = document.getElementsByTagName('*'), i;
      for (i = 0; i < objects.length; i++) {
        if (objects[i].dataset && objects[i].dataset.message) {
          objects[i].innerHTML = chrome.i18n.getMessage(objects[i].dataset.message);
        }
      }
    }
    applyTranslations();

    // Laod options
    function loadOptions() {
      // page
      if (localStorage.getItem('landingPage') === null) {
        inputLandingPage.value = 'home';
      } else {
        inputLandingPage.value = localStorage.getItem('landingPage');
      }
      if (localStorage.getItem('landingPageIfNotif') === null) {
        inputLandingPageIfNotif.value = 'notifications';
      } else {
        inputLandingPageIfNotif.value = localStorage.getItem('landingPageIfNotif');
      }
      // sound
      if (localStorage.getItem('isSound') === null) {
        inputIsSound.checked = false;
      } else {
        if (localStorage.getItem('isSound') === 'true') {
          inputIsSound.checked = true;
        }
      }
    }
    loadOptions();

    // Save options
    function saveOptions() {
      localStorage.setItem('landingPage', inputLandingPage.value);
      localStorage.setItem('landingPageIfNotif', inputLandingPageIfNotif.value);
      localStorage.setItem('isSound', inputIsSound.checked);
      chrome.runtime.sendMessage({do: 'updatebadge'});
    }
    document.getElementById('landingPage').addEventListener('change', function () {
      saveOptions();
    });
    document.getElementById('landingPageIfNotif').addEventListener('change', function () {
      saveOptions();
    });
    document.getElementById('isSound').addEventListener('change', function () {
      saveOptions();
    });
  });
})();