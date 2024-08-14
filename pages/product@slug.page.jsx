// pages/products@slug.page.jsx
import React from 'react'
import ProductPage from '../components/ProductPage'

export { Page }

function Page(pageProps) {
    console.log("Page props:", pageProps);
    return <ProductPage slug={pageProps.routeParams.slug} />
}

export const passToClient = ['routeParams']