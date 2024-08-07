// _default.page.client.jsx
export { render }

import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { PageLayout } from './PageLayout'

async function render(pageContext) {
  const { Page, urlPathname, routeParams } = pageContext
  console.log('Client-side render context:', { urlPathname, routeParams });

  // Normalize the path by removing trailing slash
  const normalizedPath = urlPathname.endsWith('/') && urlPathname !== '/'
    ? urlPathname.slice(0, -1)
    : urlPathname

  let pageComponent;
  if (normalizedPath === '/') {
    const HomePage = (await import('../pages/index/index.page')).Page;
    pageComponent = <HomePage />;
  } else if (normalizedPath === '/blogs') {
    const Blogs = (await import('../components/Blogs')).default
    pageComponent = <Blogs />;
  } else if (normalizedPath.startsWith('/blogs/')) {
    const BlogPost = (await import('../components/BlogPost')).default
    pageComponent = <BlogPost slug={routeParams.slug} />;
  } else if (normalizedPath === '/admin') {
    const AdminPanel = (await import('../components/AdminPanel')).default
    pageComponent = <AdminPanel />;
  } else if (normalizedPath === '/login') {
    const Login = (await import('../components/Login')).default
    pageComponent = <Login onLogin={() => window.location.href = '/admin'} />;
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