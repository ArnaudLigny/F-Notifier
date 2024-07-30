_F-Notifier_ is a browser extension that displays your [Facebook notifications](https://www.facebook.com/help/1036755649750898/) unread count.

> Only "classics" notifications are supported (like comments on a post or tagging, but **not _Messenger_'s notifications**).

[![F-Notifier available in the Chrome Web Store](docs/ChromeWebStoreBadgeWBorder.png)](https://chrome.google.com/webstore/detail/facebook-notifier/befpdcighpikpkklmfonkmdafmfnnkfn) [![F-Notifier available in Mozilla Add-ons](docs/AMO-button_1.png)](https://addons.mozilla.org/fr/firefox/addon/f-notifier/) [![Open New Tab After Current Tab available in Microsoft Edge Addons](docs/MicrosoftEdgeAddonsBadge.png)](https://microsoftedge.microsoft.com/addons/detail/fnotifier/jkpbopolkbhegaabkoljoofcfingihlp)<!-- [![Get F-Notifier from Opera add-ons](docs/addons_206x58_en.png)](https://addons.opera.com/fr/extensions/details/f-notifier/)-->

## Preview

![F-Notifier screenshot](docs/screenshot.png "F-Notifier screenshot")

## Releases

<dl>
<!-- RELEASES:START --><dt><a href="https://github.com/ArnaudLigny/F-Notifier/releases/tag/2.8.5">2.8.5</a></dt>
<dd><h2>What's Changed</h2>
<ul>
<li>fix: fb feed redirect error by <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/logeen/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/logeen">@logeen</a> in <a class="issue-link js-issue-link" data-error-text="Failed to load title" data-id="2407409954" data-permission-text="Title is private" data-url="https://github.com/ArnaudLigny/F-Notifier/issues/70" data-hovercard-type="pull_request" data-hovercard-url="/ArnaudLigny/F-Notifier/pull/70/hovercard" href="https://github.com/ArnaudLigny/F-Notifier/pull/70">#70</a></li>
</ul>
<p><strong>Full Changelog</strong>: <a class="commit-link" href="https://github.com/ArnaudLigny/F-Notifier/compare/2.8.4...2.8.5"><tt>2.8.4...2.8.5</tt></a></p></dd>
<dt><a href="https://github.com/ArnaudLigny/F-Notifier/releases/tag/2.8.4">2.8.4</a></dt>
<dd><p>Fix <a class="issue-link js-issue-link" data-error-text="Failed to load title" data-id="2051265552" data-permission-text="Title is private" data-url="https://github.com/ArnaudLigny/F-Notifier/issues/66" data-hovercard-type="issue" data-hovercard-url="/ArnaudLigny/F-Notifier/issues/66/hovercard" href="https://github.com/ArnaudLigny/F-Notifier/issues/66">#66</a>: spoof Facebook on Android user agent to prevent HTTP 301 redirection.</p></dd>
<dt><a href="https://github.com/ArnaudLigny/F-Notifier/releases/tag/2.8.3">2.8.3</a></dt>
<dd><p>Prevent mobile to desktop version redirect (<a class="issue-link js-issue-link" data-error-text="Failed to load title" data-id="1985431271" data-permission-text="Title is private" data-url="https://github.com/ArnaudLigny/F-Notifier/issues/64" data-hovercard-type="pull_request" data-hovercard-url="/ArnaudLigny/F-Notifier/pull/64/hovercard" href="https://github.com/ArnaudLigny/F-Notifier/pull/64">#64</a>).</p></dd>
<!-- RELEASES:END -->
</dl>

## Support

<https://github.com/ArnaudLigny/F-Notifier/issues>

## Development

### Source code

<https://github.com/ArnaudLigny/F-Notifier.git>

### Install dependencies

```bash
npm install
```

### Run tests

<a href="https://github.com/ArnaudLigny/F-Notifier/actions/workflows/test.yml"><img src="https://github.com/ArnaudLigny/F-Notifier/actions/workflows/test.yml/badge.svg" alt="Test workflow" /></a>

```bash
npm run test
```

### Build package

```bash
npm run build
```

Actions:

1. process files (with [Gulp](https://gulpjs.com)), result is stored in `build/`
2. create a ZIP archive from `build/` in `dist/`

### Deploy to stores

<a href="https://github.com/ArnaudLigny/F-Notifier/actions/workflows/release.yml"><img src="https://github.com/ArnaudLigny/F-Notifier/actions/workflows/release.yml/badge.svg" alt="Release workflow" /></a>

```bash
npm run release
```

## License

_F-Notifier_ is a free software distributed under the terms of the [MIT license](https://opensource.org/licenses/MIT).

© [Arnaud Ligny](https://arnaudligny.fr)
