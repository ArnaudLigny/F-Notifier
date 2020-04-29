# F-Notifier

> F-Notifier is a browser extension that displays your [Facebook](https://www.facebook.com) notifications unread count.

[![F-Notifier available in the Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png)](https://chrome.google.com/webstore/detail/facebook-notifier/befpdcighpikpkklmfonkmdafmfnnkfn)  [![F-Notifier available in Mozilla Add-ons](https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_1.png)](https://addons.mozilla.org/fr/firefox/addon/f-notifier/)  [<img src="https://dev.opera.com/extensions/branding-guidelines/addons_206x58_en@2x.png" alt="Get F-Notifier from Opera add-ons" width="206px"/>](https://addons.opera.com/fr/extensions/details/f-notifier/)

## Preview

![F-Notifier screenshot](docs/screenshot.png "F-Notifier screenshot")

## Development

### Install

```bash
npm install
```

### Test [![Build Status](https://www.travis-ci.com/Narno/F-Notifier.svg?branch=master)](https://www.travis-ci.com/Narno/F-Notifier)

```bash
npm run test
```

### Build

```bash
npm run build
```

Actions:
1. process files (with [Gulp](https://gulpjs.com)), result is stored in `build/`
2. create a ZIP archive from `build/` in `dist/`

### Deploy to stores

```bash
npm run release
```

## License

F-Notifier is a free software distributed under the terms of the MIT license.

© [Arnaud Ligny](https://arnaudligny.fr)
