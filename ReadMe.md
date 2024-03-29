# BIT WebVPN URL 双向转换器（浏览器扩展）

[![best of BITs](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/YDX-2147483647/best-of-bits/main/config/badge/v1.json)](https://github.com/YDX-2147483647/best-of-bits)
![Mozilla Add-on version](https://img.shields.io/amo/v/bit-webvpn-converter) ![Mozilla Add-on rating](https://img.shields.io/amo/stars/bit-webvpn-converter) ![Mozilla Add-on users](https://img.shields.io/amo/users/bit-webvpn-converter)

这个转换器相互转换内外 URL（普通校内网 URL 与校外网 WebVPN URL）。

> 校外无法访问普通 URL，校内无法访问 WebVPN URL。

转换原理源自 [spencerwooo/🥑 WEBVPN URL Converter](https://github.com/spencerwooo/bit-webvpn-converter)（及其[网页](https://webvpn.swo.moe/)）。此项目并不打算再做一个这样的网页，而是做成浏览器插件。

## 功能

- **右键菜单**：转换并在新标签页打开。（自动识别转换方向）

  ![context-menu](https://s2.loli.net/2022/11/12/4JNp3myM8EstqzZ.jpg)

  目前只有 Firefox 版支持关闭此功能。（扩展管理页 → 选项）

- **工具栏**：打开标签页或复制 URL。

  ![popup](https://s2.loli.net/2022/11/12/n4KdeP7hJxYFBgG.jpg)

- **选项页**：[webvpn.swo.moe](https://webvpn.swo.moe/) 极简版。

  ![options](https://s2.loli.net/2022/11/12/fm7tLS2M8joqBRx.jpg)

- **自动重定向**

  访问校内网页，直接重定向到 Web VPN 相应页面。（反向也可以）

  ![redirect](https://s2.loli.net/2022/11/13/bUvpwBuCGyqlQmD.gif)

  此功能默认关闭，需要到“扩展管理页 → 选项 → 重定向”打开。目前只有 Firefox 版支持。

  需规定重定向范围，只要访问的 URL 命中就会转换（自动识别转换方向）并重定向。以下是些示例。
  
  ```
  *://century.bit.edu.cn/*
  *://cxcy.bit.edu.cn/*
  *://dekt.bit.edu.cn/*
  *://dzb.bit.edu.cn/*
  *://jwms.bit.edu.cn/*
  *://mec.bit.edu.cn/*
  *://student.bit.edu.cn/*
  *://*.info.bit.edu.cn/*
  ```

  ```
  https://webvpn.bit.edu.cn/https/*
  https://webvpn.bit.edu.cn/http/*
  ```

  详细规则请参考 [WebExtensions 的匹配模式](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Match_patterns)。

## 安装

- **Chromium**（Chrome、Edge、…）

  请移步[另一仓库](https://github.com/YDX-2147483647/bit-webvpn-converter-bidirectional)。

- **Firefox**：[已上架 AMO](https://addons.mozilla.org/firefox/addon/bit-webvpn-converter/)，直接添加即可。

  以下是[开发测试方法](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)。

  1. 下载或克隆本仓库。
  2. 在 Firefox 地址栏输入`about:debugging` →（侧边栏）[此 Firefox](about:debugging#/runtime/this-firefox)。
  3. 临时扩展 → 临时载入附加组件，选择本仓库的`src/manifest.json`。

## 潜在疑问

### 为何需要□□权限？

> 括号内为涉及的功能。

- `menus`：在右键菜单增加转换按钮。（右键菜单）
- `tabs`：在新标签页打开转换后的 URL。（右键菜单、工具栏）
- `storage`：存储设置。
- （可选）`clipboardWrite`：复制转换后的 URL。（工具栏）
- （可选）`webRequest`、`webRequestBlocking`、`<all_urls>`：修改网络请求。（自动重定向）

### 图标？

现在的图标是随便画的，随时准备换掉……如果您有想法，可以提出议题（issue）。

## Chromium 版和 Firefox 版有什么区别？

- **兼容性**：Chromium 版采用 Manifest V3，而 Firefox 版采用 V2。
- **功能**：Chromium 版不支持关闭右键菜单，也不支持“自动重定向”，而 Firefox 版支持。
