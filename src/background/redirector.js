import { convert } from '../common/convert.js'


/**
 * @returns {Promise<string[]>}
 */
function get_urls_in_storage() {
    return browser.storage.sync.get('urls_filters')
        .then(({ urls_filters }) => {
            if (urls_filters instanceof Array) {
                return urls_filters
            } else {
                return []
            }
        })
}

function redirect_request(request) {
    const redirectUrl = convert(request.url).url
    console.log(`Redirecting: ${request.url} → ${redirectUrl}. `)

    return { redirectUrl }
}

async function update_filters(changes) {
    if (changes.urls_filters) {
        remove_redirector()
        await add_redirector()
    }
}

async function add_redirector() {
    const urls = await get_urls_in_storage()
    browser.webRequest.onBeforeRequest.addListener(redirect_request, { urls }, ['blocking'])
    browser.storage.onChanged.addListener(update_filters)

    console.log('%cRedirector is enabled', 'color: green;',
        `on ${urls.slice(0, 3).join(', ')}${urls.length > 3 ? '…' : ''}.`)
}

function remove_redirector() {
    browser.webRequest.onBeforeRequest.removeListener(redirect_request)
    browser.storage.onChanged.removeListener(update_filters)

    console.log('%cRedirector is disabled.', 'color: green;')
}


async function update_enable(changes) {
    if (changes.enable_redirector) {
        const { oldValue, newValue } = changes.enable_redirector
        if (oldValue && !newValue) {
            remove_redirector()
        } else if (!oldValue && newValue) {
            await add_redirector()
        }
    }
}


export default async function init_redirector() {
    // 1. Get configuration
    const { enable_redirector: enable } = await browser.storage.sync.get('enable_redirector')

    // 2. Register listeners
    browser.storage.onChanged.addListener(update_enable)
    if (enable) {
        await add_redirector()
    } else {
        console.log('Redirector is disabled when initializing.')
    }
}
