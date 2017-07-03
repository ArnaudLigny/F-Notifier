(function () {
  'use strict';

  /**
   * Config
   */

  const HOME_URL = 'https://www.facebook.com/';
  const NOTIFICATIONS_URL = 'https://www.facebook.com/notifications';
  const soundBleep = 'notification.mp3';

  /**
   * Main functions
   */

  // Notifications count function
  const notificationsCount = callback => {
    const parser = new DOMParser();

    window.fetch(HOME_URL, {
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        }

        throw new Error('Network response was not OK.');
      })
      .then(data => {
        const tmpDom = parser.parseFromString(data, 'text/html');
        const notifElem = tmpDom.querySelector('#fbNotificationsJewel > a');
        const countElem = tmpDom.querySelector('#notificationsCountValue');

        if (notifElem && countElem) {
          callback(countElem.textContent);
        }
      })
      .catch(callback);
  };

  // Update badge
  function updateBadge() {
    notificationsCount(count => {
      if (count instanceof Error) {
        render(
          '?',
          [190, 190, 190, 255],
          chrome.i18n.getMessage('browserActionErrorTitle')
        );
      } else {
        render(
          parseInt(count, 10) ? count : '',
          [208, 0, 24, 255],
          chrome.i18n.getMessage('browserActionDefaultTitle', count),
          localStorage.getItem('iconColor')
        );
        // Play sound?
        if (
          localStorage.getItem('isSound') === 'true' &&
          (parseInt(count, 10) > parseInt(localStorage.getItem('count'), 10) ||
            localStorage.getItem('count') === null)
        ) {
          playSound();
        }
        localStorage.setItem('count', count);
      }
    });
  }

  // Badge renderer
  function render(text, color, title, icon) {
    chrome.browserAction.setBadgeText({text});
    chrome.browserAction.setBadgeBackgroundColor({color});
    chrome.browserAction.setTitle({title});
    chrome.browserAction.setIcon({path: icon});
  }

  /**
   * Helpers
   */

  function getTabUrl() {
    if (parseInt(localStorage.getItem('count'), 10) > 0) {
      if (localStorage.getItem('landingPageIfNotif') === 'home') {
        return HOME_URL;
      }
      return NOTIFICATIONS_URL;
    }
    if (localStorage.getItem('landingPage') === 'notifications') {
      return NOTIFICATIONS_URL;
    }
    return HOME_URL;
  }

  function openFacebookHomeInTab(tab) {
    chrome.tabs.query({
      currentWindow: true,
      url: HOME_URL + '*'
    }, tabs => {
      if (tabs && tabs.length > 0) {
        return chrome.tabs.update(tabs[0].id, {active: true});
      }
      if (tab && tab.url === 'chrome://newtab/') {
        return chrome.tabs.update(null, {url: getTabUrl(), active: false});
      }
      return chrome.tabs.create({url: getTabUrl()});
    });
  }

  function playSound() {
    const notifAudio = new Audio(soundBleep);
    notifAudio.play();
  }

  /**
   * Events
   */

  // Chrome alarm
  chrome.alarms.create({delayInMinutes: 1, periodInMinutes: 1});
  chrome.alarms.onAlarm.addListener(updateBadge);

  // Browser action
  chrome.browserAction.onClicked.addListener(tab => {
    updateBadge();
    openFacebookHomeInTab(tab);
  });

  // Check whether new version is installed
  chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
      chrome.runtime.openOptionsPage();
    }
  });

  // On message update badge
  chrome.runtime.onMessage.addListener(updateBadge);

  // Handle connection status events
  function handleConnectionStatus(event) {
    if (event.type === 'online') {
      updateBadge();
    } else if (event.type === 'offline') {
      render(
        '?',
        [245, 159, 0, 255],
        chrome.i18n.getMessage('browserActionErrorTitle')
      );
    }
  }
  window.addEventListener('online', handleConnectionStatus);
  window.addEventListener('offline', handleConnectionStatus);
})();
