(function () {
  "use strict";

  var HOME_URL = 'https://www.facebook.com/';
  var NOTIFICATIONS_URL = 'https://www.facebook.com/notifications';
  var soundBleep = 'notification.mp3';

  // XHR helper function
  var xhr = function () {
    var xhr = new XMLHttpRequest();
    return function(method, url, callback) {
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
  }();

  // main function
  window.NotificationsCount = function (callback) {
    var tmpDom = document.createElement('div');

    xhr('GET', HOME_URL, function (data) {
      var notifElem, countElem;
      tmpDom.innerHTML = data;

      if (data === false) {
        callback(false);
      }
      notifElem = tmpDom.querySelector('#fbNotificationsJewel > a');
      if (notifElem) {
        countElem = tmpDom.querySelector('#notificationsCountValue');
        if (countElem) {
          callback(countElem.textContent);
        } else {
          callback('0');
        }
      } else {
        callback(false);
      }
    });
  };

  // badge renderer
  function render(badge, color, title, icon) {
    chrome.browserAction.setBadgeText({
      text: badge
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color: color
    });
    chrome.browserAction.setTitle({
      title: title
    });
    if (icon != null) {
      chrome.browserAction.setIcon({
        path: icon
      })
    }
  }

  // update badge
  function updateBadge() {
    NotificationsCount(function (count) {
      if (count !== false) {
        if (count == '0') {
          render(
            '',
            [208, 0, 24, 255],
            chrome.i18n.getMessage('browserActionDefaultTitle', count),
            'icon-w-19.png'
          );
        } else {
          render(
            count,
            [208, 0, 24, 255],
            chrome.i18n.getMessage('browserActionDefaultTitle', count),
            'icon-19.png'
          );
          // play sound?
          if (localStorage.getItem('isSound') == 'true'
            && (count > parseInt(localStorage.getItem('count')) || localStorage.getItem('count') === null)
          ) {
            playSound();
          }
        }
        localStorage.setItem('count', count);
      } else {
        render(
          '?',
          [190, 190, 190, 230],
          chrome.i18n.getMessage('browserActionErrorTitle')
        );
      }
    });
  }

  function isFacebookHomeUrl(url) {
    return url.indexOf(HOME_URL) == 0;
  }

  function openFacebookHomeInTab() {
    chrome.tabs.getAllInWindow(undefined, function(tabs) {
      for (var i = 0, tab; tab = tabs[i]; i++) {
        if (tab.url && isFacebookHomeUrl(tab.url)) {
          chrome.tabs.update(tab.id, {selected: true});
          return;
        }
      }
      if (parseInt(localStorage.getItem('count')) > 0) {
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
    var notifAudio = new Audio();
    notifAudio.src = soundBleep;
    notifAudio.play();
  }

  // Chrome alarm
  chrome.alarms.create('badge', {periodInMinutes: 1});
  chrome.alarms.onAlarm.addListener(function (alarm) {
    switch (alarm.name) {
      case 'badge':
        chrome.runtime.sendMessage({do: 'updatebadge'});
        break;
    }
  });

  // browser action
  chrome.browserAction.onClicked.addListener(function () {
    chrome.runtime.sendMessage({do: 'updatebadge'});
    openFacebookHomeInTab()
  });

  // check whether new version is installed
  chrome.runtime.onInstalled.addListener(function () {
    chrome.runtime.sendMessage({do: 'updatebadge'});
  });

  // on message update badge
  chrome.runtime.onMessage.addListener(function (message, sender, response) {
    switch (message.do) {
      case 'updatebadge':
        updateBadge();
        break;
    }
  });
})();