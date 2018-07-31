(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const inputLandingPage = document.getElementById('landingPage');
    const inputLandingPageIfNotif = document.getElementById('landingPageIfNotif');
    const inputIsSound = document.getElementById('isSound');

    // Apply translations
    function applyTranslations() {
      const objects = document.getElementsByTagName('*');
      let i;
      for (i = 0; i < objects.length; i++) {
        if (objects[i].dataset && objects[i].dataset.message) {
          objects[i].textContent = chrome.i18n.getMessage(objects[i].dataset.message);
        }
      }
    }
    applyTranslations();

    // Laod options
    function loadOptions() {
      // Page
      inputLandingPage.value = localStorage.getItem('landingPage');
      if (localStorage.getItem('landingPage') === null) {
        inputLandingPage.value = 'home';
      }
      inputLandingPageIfNotif.value = localStorage.getItem('landingPageIfNotif');
      if (localStorage.getItem('landingPageIfNotif') === null) {
        inputLandingPageIfNotif.value = 'notifications';
      }
      // Sound
      inputIsSound.checked = false;
      if (localStorage.getItem('isSound') === 'true') {
        inputIsSound.checked = true;
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
    document.getElementById('landingPage').addEventListener('change', () => {
      saveOptions();
    });
    document.getElementById('landingPageIfNotif').addEventListener('change', () => {
      saveOptions();
    });
    document.getElementById('isSound').addEventListener('change', () => {
      saveOptions();
      if (inputIsSound.checked === true) {
        playSound();
      }
    });
  });
})();
