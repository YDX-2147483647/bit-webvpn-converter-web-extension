import { convert } from './common/convert.js'


const MENUS = {
    convert_and_open: {
        title: '转换并在新标签页打开',
        id: 'convert-and-open',
        contexts: ['link', 'page'],
    }
}


async function init_menu() {
    let { enable_menu } = await browser.storage.sync.get('enable_menu')
    if (enable_menu !== false) {
        await browser.menus.create(MENUS.convert_and_open)
    }
}
async function update_menu(changes) {
    if (changes.enable_menu) {
        if (changes.enable_menu.newValue) {
            await browser.menus.create(MENUS.convert_and_open)
        } else {
            await browser.menus.remove(MENUS.convert_and_open.id)
        }
    }
}


init_menu()

browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case MENUS.convert_and_open.id: {
            browser.tabs.create({
                url: convert(info.linkUrl ?? info.pageUrl).url,
                index: tab.index + 1
            })
            break
        }
    }
})
browser.storage.onChanged.addListener(update_menu)
