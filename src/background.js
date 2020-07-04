/* global playSound */

(function () {
  'use strict';

  /**
   * Config
   */

  const FETCH_URL = 'https://mbasic.facebook.com/';
  const HOME_URL = 'https://www.facebook.com/';
  const NOTIFICATIONS_URL = 'https://www.facebook.com/notifications';

  /**
   * Main functions
   */

  // Notifications count function
  const notificationsCount = callback => {
    const parser = new DOMParser();

    window.fetch(FETCH_URL, {
      credentials: 'include',
      mode: 'no-cors'
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        }

        throw new Error('Network response was not OK');
      })
      .then(data => {
        let count = 0;
        let xpath = '#header > nav';
        const tmpDom = parser.parseFromString(data, 'text/html');
        if (!tmpDom.querySelector(xpath + ' > a:nth-child(4)')) {
          xpath = '#header > div';
          if (!tmpDom.querySelector(xpath + ' > a:nth-child(4)')) {
            throw new Error('User not connected');
          }
        }

        const countNotifElem = tmpDom.querySelector(xpath + ' > a:nth-child(4) > strong > span');
        const countMessElem = tmpDom.querySelector(xpath + ' > a:nth-child(3) > strong > span');
        const countReqElem = tmpDom.querySelector(xpath + ' > a:nth-child(6) > strong > span');
        if (countNotifElem) {
          count += parseInt(countNotifElem.textContent.replace(/[{()}]/g, ''), 10);
        }
        if (countMessElem) {
          count += parseInt(countMessElem.textContent.replace(/[{()}]/g, ''), 10);
        }
        if (countReqElem) {
          count += parseInt(countReqElem.textContent.replace(/[{()}]/g, ''), 10);
        }

        callback(count);
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
          chrome.i18n.getMessage('browserActionErrorTitle').concat(', ', count.message)
        );

        return;
      }
      render(
        count > 0 ? count.toString() : '',
        [208, 0, 24, 255],
        count > 1 ? chrome.i18n.getMessage('browserActionNotifTitle', count.toString()) : chrome.i18n.getMessage('browserAction01NotifTitle', count.toString())
      );
      // Play sound?
      if (
        localStorage.getItem('isSound') === 'true' &&
        (count > parseInt(localStorage.getItem('count'), 10) ||
          localStorage.getItem('count') === null)
      ) {
        playSound();
      }
      localStorage.setItem('count', count);
    });
  }

  // Badge renderer
  function render(text, color, title) {
    chrome.browserAction.setBadgeText({text});
    chrome.browserAction.setBadgeBackgroundColor({color});
    chrome.browserAction.setTitle({title});
    chrome.browserAction.setIcon({path: 'icon-38.png'});
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
    updateBadge();
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
