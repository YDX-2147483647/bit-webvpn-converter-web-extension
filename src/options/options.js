async function restore_options() {
    let { enable_menu, urls_filters, enable_redirector } = await browser.storage.sync.get([
        'enable_menu', 'urls_filters', 'enable_redirector',
    ])

    if (typeof enable_menu !== 'boolean') {
        enable_menu = true
    }
    if (!(urls_filters instanceof Array)) {
        urls_filters = []
    }
    if (typeof enable_redirector !== 'boolean') {
        enable_redirector = false
    }

    document.querySelector('#enable-menu').checked = enable_menu
    document.querySelector('#urls-filters').value = urls_filters.join('\n')
    document.querySelector('#enable-redirector').checked = enable_redirector
}

async function update_options() {
    if (document.querySelector('#enable-redirector').checked) {
        const permitted = await browser.permissions.request({
            permissions: ["webRequest", "webRequestBlocking"],
            origins: ["<all_urls>"],
        })

        if (!permitted) {
            document.querySelector('#enable-redirector').checked = false
            console.warn("Redirector wasn't enabled as you want, because webRequest, webRequestBlocking or host permission is rejected.")
        }
    }

    await browser.storage.sync.set({
        enable_menu: document.querySelector('#enable-menu').checked,
        urls_filters: document.querySelector('#urls-filters').value.split('\n'),
        enable_redirector: document.querySelector('#enable-redirector').checked,
    })
}


document.addEventListener('DOMContentLoaded', restore_options)

document.querySelector('#options').addEventListener('submit', async (event) => {
    event.preventDefault()
    await update_options()
})
