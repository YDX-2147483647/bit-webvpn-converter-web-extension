# BIT WebVPN URL 双向转换器（浏览器扩展）

这个转换器相互转换内外 URL（普通校内网 URL 与校外网 WebVPN URL）。

> 校外无法访问普通 URL，校内无法访问 WebVPN URL。

转换原理源自 [spencerwooo/🥑 WEBVPN URL Converter](https://github.com/spencerwooo/bit-webvpn-converter)（及其[网页](https://webvpn.swo.moe/)）。此项目并不打算再做一个这样的网页，而是做成浏览器插件。

## 安装方式

- **Chromium**（Chrome、Edge、…）

  请移步[另一仓库](https://github.com/YDX-2147483647/bit-webvpn-converter-bidirectional)。

- **Firefox**

  1. 访问[`about:debugging` →（侧边栏）此 Firefox](about:debugging#/runtime/this-firefox)。
  2. 临时扩展 → 临时载入附加组件，选择`manifest.json`。

