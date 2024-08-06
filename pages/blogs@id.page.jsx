import React from 'react'
import BlogPost from '../components/BlogPost'

export { Page }

function Page(pageProps) {
    return <BlogPost id={pageProps.routeParams.id} />
}

// Add this export
export const passToClient = ['routeParams']

// Add this function
export function onBeforeRender(pageContext) {
    const { routeParams } = pageContext
    return {
        pageContext: {
            routeParams
        }
    }
}