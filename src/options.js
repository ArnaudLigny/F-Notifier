/* global playSound */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const inputLandingPage = document.querySelector('#landingPage');
    const inputLandingPageIfNotif = document.querySelector('#landingPageIfNotif');
    const inputIsFriendsRequest = document.querySelector('#isFriendsReq');
    const inputIsSound = document.querySelector('#isSound');

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

      // Friends requests
      inputIsFriendsRequest.checked = false;
      if (localStorage.getItem('isFriendsReq') === 'true') {
        inputIsFriendsRequest.checked = true;
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
      localStorage.setItem('isFriendsReq', inputIsFriendsRequest.checked);
      localStorage.setItem('isSound', inputIsSound.checked);
      chrome.runtime.sendMessage({do: 'updatebadge'});
    }

    document.querySelector('#landingPage').addEventListener('change', () => {
      saveOptions();
    });
    document.querySelector('#landingPageIfNotif').addEventListener('change', () => {
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
  });
})();
