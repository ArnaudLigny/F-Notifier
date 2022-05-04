_F-Notifier_ is a browser extension that displays your [Facebook notifications](https://www.facebook.com/help/1036755649750898/) unread count.

[![F-Notifier available in the Chrome Web Store](docs/ChromeWebStoreBadgeWBorder.png)](https://chrome.google.com/webstore/detail/facebook-notifier/befpdcighpikpkklmfonkmdafmfnnkfn) [![F-Notifier available in Mozilla Add-ons](docs/AMO-button_1.png)](https://addons.mozilla.org/fr/firefox/addon/f-notifier/) [![Get F-Notifier from Opera add-ons](docs/addons_206x58_en.png)](https://addons.opera.com/fr/extensions/details/f-notifier/) [![Open New Tab After Current Tab available in Microsoft Edge Addons](docs/MicrosoftEdgeAddonsBadge.png)](https://microsoftedge.microsoft.com/addons/detail/fnotifier/jkpbopolkbhegaabkoljoofcfingihlp)

## Preview

![F-Notifier screenshot](docs/screenshot.png "F-Notifier screenshot")

## Support

<https://github.com/ArnaudLigny/F-Notifier/issues>

## Development

### Source

<https://github.com/ArnaudLigny/F-Notifier.git>

### Install

```bash
npm install
```

### Test

[![Test](https://github.com/ArnaudLigny/F-Notifier/actions/workflows/test.yml/badge.svg)](https://github.com/ArnaudLigny/F-Notifier/actions/workflows/test.yml)

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

[![Release extension](https://github.com/ArnaudLigny/F-Notifier/actions/workflows/release.yml/badge.svg)](https://github.com/ArnaudLigny/F-Notifier/actions/workflows/release.yml)

```bash
npm run release
```

## License

_F-Notifier_ is a free software distributed under the terms of the [MIT license](https://opensource.org/licenses/MIT).

© [Arnaud Ligny](https://arnaudligny.fr)
