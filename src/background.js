/**
 * Copyright (c) Arnaud Ligny <arnaud@ligny.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Config
 */

const FETCH_URL = 'https://m.facebook.com/a/preferences.php?basic_site_devices=m_basic';
const HOME_URL = 'https://www.facebook.com/';
const NOTIFICATIONS_URL = HOME_URL + 'notifications';
const RELEASES_URL = 'https://dev.ligny.org/F-Notifier/#releases';
const ISSUES_URL = 'https://github.com/ArnaudLigny/F-Notifier/issues/';

/**
 * Storage helpers
 */

async function getStorage(key, defaultValue = null) {
  const result = await chrome.storage.local.get([key]);
  return result[key] === undefined ? defaultValue : result[key];
}

async function setStorage(key, value) {
  await chrome.storage.local.set({[key]: value});
}

// Service workers have no DOM/Audio, so both live in an offscreen document.
async function ensureOffscreen() {
  const contexts = await chrome.runtime.getContexts({contextTypes: ['OFFSCREEN_DOCUMENT']});
  if (contexts.length === 0) {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK', 'DOM_PARSER'],
      justification: 'Play the notification sound and parse the Facebook page.',
    });
  }
}

/**
 * Main functions
 */

// Notifications count function
const notificationsCount = async () => {
  const response = await fetch(FETCH_URL, {
    cache: 'no-cache',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not OK');
  }

  const data = await response.text();
  await ensureOffscreen();
  const parsed = await chrome.runtime.sendMessage({action: 'parseNotifications', html: data});

  if (!parsed || parsed.notif === null) {
    throw new Error('User not connected.');
  }

  let count = Number.parseInt(parsed.notif, 10);

  const isFriendsRequest = await getStorage('isFriendsReq', true);
  if ((isFriendsRequest === true || isFriendsRequest === 'true') && parsed.request !== null) {
    count += Number.parseInt(parsed.request, 10);
  }

  return count;
};

// Update badge
async function updateBadge() {
  try {
    const count = await notificationsCount();

    render(
      count > 0 ? count.toString() : '',
      [208, 0, 24, 255],
      count > 1 ? chrome.i18n.getMessage('actionNotifTitle', count.toString()) : chrome.i18n.getMessage('action01NotifTitle', count.toString()),
    );

    // Play sound?
    const isSound = await getStorage('isSound', false);
    const storedCount = await getStorage('count', null);
    if (
      (isSound === true || isSound === 'true')
      && (count > Number.parseInt(storedCount, 10) || storedCount === null)
    ) {
      await playSound();
    }

    await setStorage('count', count);
  } catch {
    render(
      '?',
      [190, 190, 190, 255],
      chrome.i18n.getMessage('actionErrorTitle'),
    );
  }
}

// Badge renderer
function render(text, color, title) {
  chrome.action.setBadgeText({text});
  chrome.action.setBadgeBackgroundColor({color});
  chrome.action.setTitle({title});
  chrome.action.setIcon({path: 'icon-38.png'});
}

// Sound playback via the offscreen document
async function playSound() {
  await ensureOffscreen();
  chrome.runtime.sendMessage({action: 'playSound'});
}

/**
 * Helpers
 */

async function getTabUrl() {
  const count = await getStorage('count', 0);
  if (Number.parseInt(count, 10) > 0) {
    const landingPageIfNotif = await getStorage('landingPageIfNotif', 'notifications');
    if (landingPageIfNotif === 'home') {
      return HOME_URL;
    }

    return NOTIFICATIONS_URL;
  }

  const landingPage = await getStorage('landingPage', 'home');
  if (landingPage === 'notifications') {
    return NOTIFICATIONS_URL;
  }

  return HOME_URL;
}

async function openFacebookHomeInTab(tab) {
  const url = await getTabUrl();
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    url: HOME_URL + '*',
  });

  if (tabs && tabs.length > 0) {
    return chrome.tabs.update(tabs[0].id, {active: true});
  }

  if (tab && tab.url === 'chrome://newtab/') {
    return chrome.tabs.update(tab.id, {url, active: false});
  }

  return chrome.tabs.create({url});
}

/**
 * Events
 */

// Chrome alarm
chrome.alarms.create('fetchNotifications', {delayInMinutes: 1, periodInMinutes: 1});
chrome.alarms.onAlarm.addListener(updateBadge);

// Action
chrome.action.onClicked.addListener(tab => {
  updateBadge();
  openFacebookHomeInTab(tab);
});

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(async details => {
  // Set default options
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    await chrome.storage.local.set({
      isFriendsReq: true,
      isShowUpdates: true,
      landingPage: 'home',
      landingPageIfNotif: 'notifications',
      isSound: false,
    });
    chrome.runtime.openOptionsPage();
  }

  // Open releases details on update
  if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    const isShowUpdates = await getStorage('isShowUpdates', true);
    if (isShowUpdates === true || isShowUpdates === 'true') {
      chrome.tabs.create({url: RELEASES_URL});
    }
  }

  // Open issue on uninstall
  chrome.runtime.setUninstallURL((() => {
    switch (chrome.i18n.getUILanguage()) {
      case 'fr': {
        return ISSUES_URL + '/new?labels=survey&title=Mon+avis+à+propos+de+cette+extension';
      }

      default: {
        return ISSUES_URL + '/new?labels=survey&title=My+opinion+about+this+extension';
      }
    }
  })());

  updateBadge();
});

// On message update badge
chrome.runtime.onMessage.addListener(message => {
  if (message && message.do === 'updatebadge') {
    updateBadge();
  }
});

// Handle connection status events
self.addEventListener('online', () => {
  updateBadge();
});
self.addEventListener('offline', () => {
  render(
    '?',
    [245, 159, 0, 255],
    chrome.i18n.getMessage('actionErrorTitle'),
  );
});
