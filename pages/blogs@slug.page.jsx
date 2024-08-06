// pages/blogs@slug.page.jsx
import React from 'react'
import BlogPost from '../components/BlogPost'

export { Page }

function Page(pageProps) {
    console.log("Page props:", pageProps);
    return <BlogPost slug={pageProps.routeParams.slug} />
}

export const passToClient = ['routeParams']