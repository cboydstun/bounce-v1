// renderer/_default.page.route.js
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
    if (normalizedPath === '/products') {
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
    const blogMatch = /^\/blogs\/([^\/]+)/.exec(normalizedPath)
    if (blogMatch) {
        console.log("Blog post route matched. Slug:", blogMatch[1]);
        return { routeParams: { slug: blogMatch[1] } }
    }
    const productMatch = /^\/products\/([^\/]+)/.exec(normalizedPath)
    if (productMatch) {
        console.log("Product route matched. Slug:", productMatch[1]);
        return { routeParams: { slug: productMatch[1] } }
    }
    // For all other routes, return null to let vite-plugin-ssr handle them
    return null
}