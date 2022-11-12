import { convert } from './common/convert.js'

browser.menus.create({
    title: '转换并在新标签页打开',
    id: 'convert-and-open',
    contexts: ["all"]
})
browser.menus.onClicked.addListener((info, tab) => {
    if (info.menuItemId !== 'convert-and-open')
        return

    browser.tabs.create({
        url: convert(info.pageUrl).url,
        index: tab.index + 1
    })
})
