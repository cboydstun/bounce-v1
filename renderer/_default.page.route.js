export default function (pageContext) {
    const { urlPathname } = pageContext
    if (urlPathname === '/') {
        return { routeParams: {} }
    }
    if (urlPathname === '/blogs') {
        return { routeParams: {} }
    }
    const match = /^\/blogs\/([^\/]+)/.exec(urlPathname)
    if (match) {
        return { routeParams: { id: match[1] } }
    }
    // For all other routes, return null to let vite-plugin-ssr handle them
    return null
}