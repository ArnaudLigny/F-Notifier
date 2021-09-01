# F-Notifier

> F-Notifier is a browser extension that displays your [Facebook](https://www.facebook.com) notifications unread count.

[![F-Notifier available in the Chrome Web Store](docs/ChromeWebStoreBadgeWBorder.png)](https://chrome.google.com/webstore/detail/facebook-notifier/befpdcighpikpkklmfonkmdafmfnnkfn) [![F-Notifier available in Mozilla Add-ons](docs/AMO-button_1.png)](https://addons.mozilla.org/fr/firefox/addon/f-notifier/) [![Get F-Notifier from Opera add-ons](docs/addons_206x58_en.png)](https://addons.opera.com/fr/extensions/details/f-notifier/) [![Open New Tab After Current Tab available in Microsoft Edge Addons](docs/MicrosoftEdgeAddonsBadge.png)](https://microsoftedge.microsoft.com/addons/search?developer=Arnaud%20Ligny)

## Preview

![F-Notifier screenshot](docs/screenshot.png "F-Notifier screenshot")

## Development

### Install

```bash
npm install
```

### Test

[![Build Status](https://api.travis-ci.com/Narno/F-Notifier.svg?branch=master)](https://app.travis-ci.com/github/Narno/F-Notifier)

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

## Source

<https://github.com/Narno/F-Notifier>

## License

_F-Notifier_ is a free software distributed under the terms of the [MIT license](https://opensource.org/licenses/MIT).

© [Arnaud Ligny](https://arnaudligny.fr)
