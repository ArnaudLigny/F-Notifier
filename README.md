_F-Notifier_ is a browser extension that displays your [Facebook notifications](https://www.facebook.com/help/1036755649750898/) unread count.

> Only "classics" notifications are supported (like comments on a post or tagging, but **not _Messenger_'s notifications**).

[![F-Notifier available in the Chrome Web Store](docs/ChromeWebStoreBadgeWBorder.png)](https://chrome.google.com/webstore/detail/facebook-notifier/befpdcighpikpkklmfonkmdafmfnnkfn) [![F-Notifier available in Mozilla Add-ons](docs/AMO-button_1.png)](https://addons.mozilla.org/fr/firefox/addon/f-notifier/) [![Open New Tab After Current Tab available in Microsoft Edge Addons](docs/MicrosoftEdgeAddonsBadge.png)](https://microsoftedge.microsoft.com/addons/detail/fnotifier/jkpbopolkbhegaabkoljoofcfingihlp)<!-- [![Get F-Notifier from Opera add-ons](docs/addons_206x58_en.png)](https://addons.opera.com/fr/extensions/details/f-notifier/)-->

## Preview

![F-Notifier screenshot](docs/screenshot.png "F-Notifier screenshot")

## Latest releases

<dl>
<!-- RELEASES:START --><dt><a href="https://github.com/ArnaudLigny/F-Notifier/releases/tag/2.8.5">2.8.5</a></dt>
<dd>&lt;h2&gt;What&#39;s Changed&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;fix: fb feed redirect error by &lt;a class=&quot;user-mention notranslate&quot; data-hovercard-type=&quot;user&quot; data-hovercard-url=&quot;/users/logeen/hovercard&quot; data-octo-click=&quot;hovercard-link-click&quot; data-octo-dimensions=&quot;link_type:self&quot; href=&quot;https://github.com/logeen&quot;&gt;@logeen&lt;/a&gt; in &lt;a class=&quot;issue-link js-issue-link&quot; data-error-text=&quot;Failed to load title&quot; data-id=&quot;2407409954&quot; data-permission-text=&quot;Title is private&quot; data-url=&quot;https://github.com/ArnaudLigny/F-Notifier/issues/70&quot; data-hovercard-type=&quot;pull_request&quot; data-hovercard-url=&quot;/ArnaudLigny/F-Notifier/pull/70/hovercard&quot; href=&quot;https://github.com/ArnaudLigny/F-Notifier/pull/70&quot;&gt;#70&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;&lt;strong&gt;Full Changelog&lt;/strong&gt;: &lt;a class=&quot;commit-link&quot; href=&quot;https://github.com/ArnaudLigny/F-Notifier/compare/2.8.4...2.8.5&quot;&gt;&lt;tt&gt;2.8.4...2.8.5&lt;/tt&gt;&lt;/a&gt;&lt;/p&gt;</dd>
<dt><a href="https://github.com/ArnaudLigny/F-Notifier/releases/tag/2.8.4">2.8.4</a></dt>
<dd>&lt;p&gt;Fix &lt;a class=&quot;issue-link js-issue-link&quot; data-error-text=&quot;Failed to load title&quot; data-id=&quot;2051265552&quot; data-permission-text=&quot;Title is private&quot; data-url=&quot;https://github.com/ArnaudLigny/F-Notifier/issues/66&quot; data-hovercard-type=&quot;issue&quot; data-hovercard-url=&quot;/ArnaudLigny/F-Notifier/issues/66/hovercard&quot; href=&quot;https://github.com/ArnaudLigny/F-Notifier/issues/66&quot;&gt;#66&lt;/a&gt;: spoof Facebook on Android user agent to prevent HTTP 301 redirection.&lt;/p&gt;</dd>
<dt><a href="https://github.com/ArnaudLigny/F-Notifier/releases/tag/2.8.3">2.8.3</a></dt>
<dd>&lt;p&gt;Prevent mobile to desktop version redirect &lpar;&lt;a class=&quot;issue-link js-issue-link&quot; data-error-text=&quot;Failed to load title&quot; data-id=&quot;1985431271&quot; data-permission-text=&quot;Title is private&quot; data-url=&quot;https://github.com/ArnaudLigny/F-Notifier/issues/64&quot; data-hovercard-type=&quot;pull_request&quot; data-hovercard-url=&quot;/ArnaudLigny/F-Notifier/pull/64/hovercard&quot; href=&quot;https://github.com/ArnaudLigny/F-Notifier/pull/64&quot;&gt;#64&lt;/a&gt;&rpar;.&lt;/p&gt;</dd>
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
