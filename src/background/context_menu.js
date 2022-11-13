import { convert } from '../common/convert.js'


const MENUS = {
    convert_and_open: {
        title: '转换并在新标签页打开',
        id: 'convert-and-open',
        contexts: ['link', 'page'],
    }
}


async function create_menu() {
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

async function handle_menu(info, tab) {
    switch (info.menuItemId) {
        case MENUS.convert_and_open.id: {
            browser.tabs.create({
                url: convert(info.linkUrl ?? info.pageUrl).url,
                index: tab.index + 1
            })
            break
        }
    }
}


export default function init_menu() {
    create_menu()
    browser.menus.onClicked.addListener(handle_menu)
    browser.storage.onChanged.addListener(update_menu)
}
