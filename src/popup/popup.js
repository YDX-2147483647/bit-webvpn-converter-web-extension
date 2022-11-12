import { convert } from '../common/convert.js'

const open_btn = document.querySelector("#open"),
    copy_btn = document.querySelector("#copy")

let tab_index, target_url

window.addEventListener("load", async () => {
    const [tab] = await (browser.tabs.query({ active: true, currentWindow: true }))
    tab_index = tab.index
    let to;
    ({ url: target_url, to, } = convert(tab.url))

    document.querySelector("#target-type").textContent =
        to === 'webvpn' ? ' WebVPN' : '校内网'
})

open_btn.addEventListener('click', () => {
    browser.tabs.create({
        url: target_url,
        index: tab_index + 1
    })
})

copy_btn.addEventListener('click', async () => {
    copy_btn.classList.remove('success', 'failed')

    try {
        await navigator.clipboard.writeText(target_url)
        copy_btn.classList.add('success')
    } catch (error) {
        copy_btn.classList.add('failed')
    }
})