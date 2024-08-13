export default function (pageContext) {
    const { urlPathname } = pageContext

    console.log("Routing for:", urlPathname);

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
    if (normalizedPath === '/admin') {
        return { routeParams: {} }
    }
    if (normalizedPath === '/admin/products') {
        return { routeParams: {} }
    }
    if (normalizedPath === '/admin/contacts') {
        return { routeParams: {} }
    }
    if (normalizedPath === '/login') {
        return { routeParams: {} }
    }
    const match = /^\/blogs\/([^\/]+)/.exec(normalizedPath)
    if (match) {
        console.log("Blog post route matched. Slug:", match[1]);
        return { routeParams: { slug: match[1] } }
    }
    // For all other routes, return null to let vite-plugin-ssr handle them
    return null
}