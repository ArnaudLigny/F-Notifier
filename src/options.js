(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var inputLandingPageHome = document.getElementById('landingPageHome');
    var inputLandingPageNotifications = document.getElementById('landingPageNotifications');
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
        inputLandingPageNotifications.checked = true;
      } else {
        if (localStorage.getItem('landingPage') === 'home') {
          inputLandingPageHome.checked = true;
        } else if (localStorage.getItem('landingPage') === 'notifications') {
          inputLandingPageNotifications.checked = true;
        }
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
      if (inputLandingPageHome.checked) {
        localStorage.setItem('landingPage', 'home');
      } else {
        localStorage.setItem('landingPage', 'notifications');
      }
      localStorage.setItem('isSound', inputIsSound.checked);
      chrome.runtime.sendMessage({do: 'updatebadge'});
    }
    document.getElementById('landingPageHome').addEventListener('change', function () {
      saveOptions();
    });
    document.getElementById('landingPageNotifications').addEventListener('change', function () {
      saveOptions();
    });
    document.getElementById('isSound').addEventListener('change', function () {
      saveOptions();
    });
  });
})();