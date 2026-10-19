/* global playSound */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const inputLandingPage = document.querySelector('#landingPage');
    const inputLandingPageIfNotif = document.querySelector('#landingPageIfNotif');
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

    // Load options
    async function loadOptions() {
      const options = await chrome.storage.local.get([
        'landingPage',
        'landingPageIfNotif',
        'isFriendsReq',
        'isSound',
        'isShowUpdates',
      ]);

      // Page
      inputLandingPage.value = options.landingPage ?? 'home';
      inputLandingPageIfNotif.value = options.landingPageIfNotif ?? 'notifications';

      // Friends requests
      inputIsFriendsRequest.checked = options.isFriendsReq !== false && options.isFriendsReq !== 'false';

      // Sound
      inputIsSound.checked = options.isSound === true || options.isSound === 'true';

      // Show updates
      inputIsShowUpdates.checked = options.isShowUpdates !== false && options.isShowUpdates !== 'false';
    }

    loadOptions();

    // Save options
    async function saveOptions() {
      await chrome.storage.local.set({
        landingPage: inputLandingPage.value,
        landingPageIfNotif: inputLandingPageIfNotif.value,
        isFriendsReq: inputIsFriendsRequest.checked,
        isSound: inputIsSound.checked,
        isShowUpdates: inputIsShowUpdates.checked,
      });
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
    document.querySelector('#isShowUpdates').addEventListener('change', () => {
      saveOptions();
    });
  });
})();
