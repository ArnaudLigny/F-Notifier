/**
 * Copyright (c) Arnaud Ligny <arnaud@ligny.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// The service worker has no DOM, so audio playback and HTML parsing happen here.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'playSound') {
    const notifAudio = new Audio('notification.mp3');
    notifAudio.play();
    return;
  }

  if (message.action === 'parseNotifications') {
    const parser = new DOMParser();
    const temporaryDom = parser.parseFromString(message.html, 'text/html');
    const classSelector = '._59tg';
    const countNotifElement = temporaryDom.querySelector('#notifications_jewel')?.querySelector(classSelector);
    const countRequestElement = temporaryDom.querySelector('#requests_jewel')?.querySelector(classSelector);
    sendResponse({
      notif: countNotifElement ? countNotifElement.textContent : null,
      request: countRequestElement ? countRequestElement.textContent : null,
    });
  }
});
