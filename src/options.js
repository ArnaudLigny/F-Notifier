/* global playSound */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const inputLandingPage = document.querySelector('#landingPage');
    const inputLandingPageIfNotif = document.querySelector('#landingPageIfNotif');
    const inputIsHomeNotification = document.querySelector('#isHomeNotif');
    const inputIsFriendsRequest = document.querySelector('#isFriendsReq');
    const inputIsSound = document.querySelector('#isSound');
    const inputIsShowUpdates = document.querySelector('#isShowUpdates');

    // Apply translations
    function applyTranslations() {
      const objects = document.querySelectorAll('*');
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

      // Home notifications
      inputIsHomeNotification.checked = true;
      if (localStorage.getItem('isHomeNotif') === 'false') {
        inputIsHomeNotification.checked = false;
      }

      // Friends requests
      inputIsFriendsRequest.checked = true;
      if (localStorage.getItem('isFriendsReq') === 'false') {
        inputIsFriendsRequest.checked = false;
      }

      // Sound
      inputIsSound.checked = false;
      if (localStorage.getItem('isSound') === 'true') {
        inputIsSound.checked = true;
      }

      // Show updates
      inputIsShowUpdates.checked = true;
      if (localStorage.getItem('isShowUpdates') === 'false') {
        inputIsShowUpdates.checked = false;
      }
    }

    loadOptions();

    // Save options
    function saveOptions() {
      localStorage.setItem('landingPage', inputLandingPage.value);
      localStorage.setItem('landingPageIfNotif', inputLandingPageIfNotif.value);
      localStorage.setItem('isHomeNotif', inputIsHomeNotification.checked);
      localStorage.setItem('isFriendsReq', inputIsFriendsRequest.checked);
      localStorage.setItem('isSound', inputIsSound.checked);
      localStorage.setItem('isShowUpdates', inputIsShowUpdates.checked);
      chrome.runtime.sendMessage({do: 'updatebadge'});
    }

    document.querySelector('#landingPage').addEventListener('change', () => {
      saveOptions();
    });
    document.querySelector('#landingPageIfNotif').addEventListener('change', () => {
      saveOptions();
    });
    document.querySelector('#isHomeNotif').addEventListener('change', () => {
      saveOptions();
    });
    document.querySelector('#isFriendsReq').addEventListener('change', () => {
      saveOptions();
    });
    document.querySelector('#isSound').addEventListener('change', () => {
      saveOptions();
      if (inputIsSound.checked === true) {
        playSound();
      }
    });
    document.querySelector('#isShowUpdates').addEventListener('change', () => {
      saveOptions();
    });
  });
})();
