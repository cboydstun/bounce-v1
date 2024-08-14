// renderer/_default.page.client.jsx
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
  } else if (normalizedPath === '/products') {
    const Products = (await import('../components/Products')).default
    pageComponent = <Products />;
  } else if (normalizedPath.startsWith('/products/')) {
    const ProductPage = (await import('../components/ProductPage')).default
    pageComponent = <ProductPage slug={routeParams.slug} />;
  } else if (normalizedPath === '/admin') {
    const AdminPage = (await import('../pages/admin.page')).Page
    pageComponent = <AdminPage />;
  } else if (normalizedPath === '/admin/products') {
    const ProductsPage = (await import('../pages/admin/products.page')).Page
    pageComponent = <ProductsPage />;
  } else if (normalizedPath === '/admin/contacts') {
    const ContactsPage = (await import('../pages/admin/contacts.page')).Page
    pageComponent = <ContactsPage />;
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