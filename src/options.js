(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var inputIconB = document.getElementById('iconB');
    var inputIconW = document.getElementById('iconW');
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
      // icon
      if (localStorage.getItem('iconColor') === null) {
        inputIconB.checked = true;
      } else {
        if (localStorage.getItem('iconColor') == 'icon-19.png') {
          inputIconB.checked = true;
        } else {
          inputIconW.checked = true;
        }
      }
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
      if (inputIconB.checked) {
        localStorage.setItem('iconColor', 'icon-19.png');
      } else {
        localStorage.setItem('iconColor', 'icon-w-19.png');
      }
      localStorage.setItem('landingPage', inputLandingPage.value);
      localStorage.setItem('landingPageIfNotif', inputLandingPageIfNotif.value);
      localStorage.setItem('isSound', inputIsSound.checked);
      chrome.runtime.sendMessage({do: 'updatebadge'});
    }
    document.getElementById('iconB').addEventListener('change', function () {
      saveOptions();
    });
    document.getElementById('iconW').addEventListener('change', function () {
      saveOptions();
    });
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