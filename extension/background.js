(function () {
  var HOME_URL = 'https://www.facebook.com/';
  var NOTIFICATIONS_URL = 'https://www.facebook.com/notifications';
  
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
      }
      else {
        callback(false);
      }
    });
  };

  // badge renderer
  function render(badge, color, title) {
    chrome.browserAction.setBadgeText({
      text: badge
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color: color
    });
    chrome.browserAction.setTitle({
      title: title
    });
  }

  // update badge
  function updateBadge() {
    NotificationsCount(function (count) {
      if (count !== false) {
        render((count !== '0' ? count : ''), [208, 0, 24, 255], chrome.i18n.getMessage('browserActionDefaultTitle', count));
      } else {
        render('?', [190, 190, 190, 230], chrome.i18n.getMessage('browserActionErrorTitle'));
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
      chrome.tabs.create({url: HOME_URL});
    });
  }

  // Chrome alarm
  chrome.alarms.create({periodInMinutes: 1});
  chrome.alarms.onAlarm.addListener(function () {
    chrome.runtime.sendMessage({do: 'updatebadge'});
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