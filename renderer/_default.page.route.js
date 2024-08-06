export default function (pageContext) {
    const { urlPathname } = pageContext

    // Normalize the path by removing trailing slash
    const normalizedPath = urlPathname.endsWith('/') && urlPathname !== '/'
        ? urlPathname.slice(0, -1)
        : urlPathname

    if (normalizedPath === '' || normalizedPath === '/') {
        return { routeParams: {} }
    }
    if (normalizedPath === '/blogs') {
        return { routeParams: {} }
    }
    const match = /^\/blogs\/([^\/]+)/.exec(normalizedPath)
    if (match) {
        return { routeParams: { id: match[1] } }
    }
    // For all other routes, return null to let vite-plugin-ssr handle them
    return null
}