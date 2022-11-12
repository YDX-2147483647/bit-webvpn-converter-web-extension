async function restore_options() {
    let { enable_menu } = await browser.storage.sync.get('enable_menu')
    if (typeof enable_menu !== 'boolean') {
        enable_menu = true
    }
    document.querySelector('#enable-menu').checked = enable_menu
}

document.addEventListener('DOMContentLoaded', restore_options)

document.querySelector('#options').addEventListener('submit', async (event) => {
    event.preventDefault()

    await browser.storage.sync.set({
        enable_menu: document.querySelector('#enable-menu').checked
    })
})
