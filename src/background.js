(function () {
  'use strict';

  /**
   * Config
   */

  const HOME_URL = 'https://www.facebook.com/';
  const NOTIFICATIONS_URL = 'https://www.facebook.com/notifications';
  const soundBleep = 'notification.mp3';

  // XHR helper function
  const xhr = (function () {
    const xhr = new XMLHttpRequest();
    return function (method, url, callback) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status !== 200) {
            callback(false);
          }
          callback(xhr.responseText);
        }
      };
      xhr.open(method, url);
      xhr.send();
    };
  })();

  /**
   * Main functions
   */

  // Notifications count function
  const notificationsCount = callback => {
    const tmpDom = document.createElement('div');

    xhr('GET', HOME_URL, data => {
      const notifElem = tmpDom.querySelector('#fbNotificationsJewel > a');
      const countElem = tmpDom.querySelector('#notificationsCountValue');
      tmpDom.innerHTML = data;

      if (data === false) {
        callback(false);
      }

      if (notifElem) {
        if (countElem) {
          callback(countElem.textContent);
        }
        callback('0');
      }
      callback(false);
    });
  };

  // Update badge
  function updateBadge() {
    notificationsCount(count => {
      if (count === false) {
        render(
          '?',
          [190, 190, 190, 230],
          chrome.i18n.getMessage('browserActionErrorTitle')
        );
      } else {
        if (count === '0') {
          render(
            '',
            [208, 0, 24, 255],
            chrome.i18n.getMessage('browserActionDefaultTitle', count),
            localStorage.getItem('iconColor')
          );
        } else {
          render(
            count,
            [208, 0, 24, 255],
            chrome.i18n.getMessage('browserActionDefaultTitle', count),
            localStorage.getItem('iconColor')
          );
          // Play sound?
          if (localStorage.getItem('isSound') === 'true' && (count > parseInt(localStorage.getItem('count'), 10) || localStorage.getItem('count') === null)
          ) {
            playSound();
          }
        }
        localStorage.setItem('count', count);
      }
    });
  }

  // Badge renderer
  function render(badge, color, title, icon) {
    chrome.browserAction.setBadgeText({
      text: badge
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color
    });
    chrome.browserAction.setTitle({
      title
    });
    if (icon !== null) {
      chrome.browserAction.setIcon({
        path: icon
      });
    }
  }

  /**
   * Helpers
   */

  function isFacebookHomeUrl(url) {
    return url.indexOf(HOME_URL) === 0;
  }

  function openFacebookHomeInTab() {
    chrome.tabs.getAllInWindow(undefined, tabs => {
      for (let i = 0, tab; (tab = tabs[i]); i++) {
        if (tab.url && isFacebookHomeUrl(tab.url)) {
          chrome.tabs.update(tab.id, {highlighted: true});
          return;
        }
      }
      if (parseInt(localStorage.getItem('count'), 10) > 0) {
        if (localStorage.getItem('landingPageIfNotif') === null || localStorage.getItem('landingPageIfNotif') === 'notifications') {
          chrome.tabs.create({url: NOTIFICATIONS_URL});
        } else {
          chrome.tabs.create({url: HOME_URL});
        }
      } else {
        if (localStorage.getItem('landingPage') === null || localStorage.getItem('landingPage') === 'home') {
          chrome.tabs.create({url: HOME_URL});
        } else {
          chrome.tabs.create({url: NOTIFICATIONS_URL});
        }
      }
    });
  }

  function playSound() {
    const notifAudio = new Audio();
    notifAudio.src = soundBleep;
    notifAudio.play();
  }

  /**
   * Events
   */

  // Chrome alarm
  chrome.alarms.create({delayInMinutes: 1, periodInMinutes: 1});
  chrome.alarms.onAlarm.addListener(updateBadge);

  // Browser action
  chrome.browserAction.onClicked.addListener(() => {
    updateBadge();
    openFacebookHomeInTab();
  });

  // Check whether new version is installed
  chrome.runtime.onInstalled.addListener(details => {
    switch (details.reason) {
      case 'install':
        chrome.runtime.openOptionsPage();
        break;
      default:
        updateBadge();
    }
  });

  // On message update badge
  chrome.runtime.onMessage.addListener(message => {
    switch (message.do) {
      case 'updatebadge':
        updateBadge();
        break;
      default:
        // Nothing to do!
    }
  });
})();
