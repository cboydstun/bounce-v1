// _default.page.client.jsx
export { render }

import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { PageLayout } from './PageLayout'

async function render(pageContext) {
  const { Page, urlPathname, routeParams } = pageContext

  let pageComponent;
  if (urlPathname === '/') {
    const HomePage = (await import('../pages/index/index.page')).Page;
    pageComponent = <HomePage />;
  } else if (urlPathname === '/blogs') {
    const Blogs = (await import('../components/Blogs')).default
    pageComponent = <Blogs />;
  } else if (urlPathname.startsWith('/blogs/')) {
    const BlogPost = (await import('../components/BlogPost')).default
    pageComponent = <BlogPost id={routeParams.id} />;
  } else {
    pageComponent = <Page {...pageContext} />;
  }

  hydrateRoot(
    document.getElementById('page-view'),
    <PageLayout>
      {pageComponent}
    </PageLayout>
  )
}