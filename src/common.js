/* eslint no-unused-vars:0 */

const playSound = function () {
  const soundBleep = 'notification.mp3';

  const notifAudio = new Audio(soundBleep);
  notifAudio.play();
};
