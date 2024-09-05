// renderer/_default.page.server.jsx
import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { PageLayout } from './PageLayout'
import HeadWithGtag from '../components/HeadWithGtag'
import Blogs from '../components/Blogs'
import BlogPost from '../components/BlogPost'
import Products from '../components/Products'
import ProductPage from '../components/ProductPage'

export const passToClient = ['urlPathname', 'routeParams', 'documentProps', 'blogData', 'productData']

export { render, onBeforeRender }

const defaultImage = 'https://www.satxbounce.com/satx-bounce-house-rental-san-antonio-og-image.jpg';

// Function to ensure image URL is absolute
const getAbsoluteImageUrl = (imageUrl) => {
  console.log("Input image URL:", imageUrl);
  if (!imageUrl) {
    console.log("No image URL provided, using default");
    return defaultImage;
  }
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    console.log("Image URL is already absolute, returning as-is");
    return imageUrl;
  }
  // Remove leading slash if present
  const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
  const baseUrl = import.meta.env.VITE_SERVER_URL || 'https://www.satxbounce.com';
  const fullUrl = `${baseUrl}/${cleanImageUrl}`;
  console.log("Constructed full URL:", fullUrl);
  return fullUrl;
};

async function onBeforeRender(pageContext) {
  const { urlPathname } = pageContext
  if (urlPathname.startsWith('/blogs/')) {
    const slug = urlPathname.split('/')[2]
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs/${slug}`)
      if (!response.ok) {
        throw new Error('Failed to fetch blog post')
      }
      const blogData = await response.json()
      return {
        pageContext: {
          routeParams: { slug },
          blogData
        }
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      return {
        pageContext: {
          routeParams: { slug },
          blogData: null
        }
      }
    }
  } else if (urlPathname.startsWith('/products/')) {
    const slug = urlPathname.split('/')[2]
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/${slug}`)
      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }
      const productData = await response.json()
      return {
        pageContext: {
          routeParams: { slug },
          productData
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      return {
        pageContext: {
          routeParams: { slug },
          productData: null
        }
      }
    }
  }
  return {}
}

async function render(pageContext) {
  const { Page, urlPathname, routeParams, blogData, productData } = pageContext;
  console.log("Server render context:", { urlPathname, routeParams, blogData, productData });

  // Normalize the path by removing trailing slash
  const normalizedPath = urlPathname.endsWith('/') && urlPathname !== '/'
    ? urlPathname.slice(0, -1)
    : urlPathname

  let pageComponent;
  try {
    if (normalizedPath === '/') {
      const HomePage = (await import('../pages/index/index.page')).Page;
      pageComponent = <HomePage />;
    } else if (normalizedPath === '/blogs') {
      pageComponent = <Blogs />;
    } else if (normalizedPath.startsWith('/blogs/')) {
      pageComponent = <BlogPost slug={routeParams.slug} />;
    } else if (normalizedPath === '/products') {
      pageComponent = <Products />;
    } else if (normalizedPath.startsWith('/products/')) {
      pageComponent = <ProductPage slug={routeParams.slug} />;
    } else {
      pageComponent = <Page props={pageContext} />;
    }

    const viewHtml = renderToString(
      <PageLayout>
        {pageComponent}
      </PageLayout>
    );

    const headWithGtagHtml = dangerouslySkipEscape(renderToString(<HeadWithGtag />));

    let pageTitle = "SATX Bounce House and Inflatable Rentals - San Antonio, TX";
    let pageDescription = "SATX Bounce House and Party Rentals in San Antonio. High-quality and affordable bounce house, inflatable, and event rentals for your events. Contact now!";
    let pageImage = defaultImage;

    if (normalizedPath === "/") {
      // Homepage specific head elements
      pageTitle = "SATX Bounce House and Inflatable Rentals - San Antonio, TX ";
      pageDescription = "SATX Bounce House and Party Rentals in San Antonio. High-quality and affordable bounce house, inflatable, and event rentals for your events. Contact now!";
    } else if (normalizedPath === "/faq") {
      // FAQ page specific head elements
      pageTitle = "FAQ - SATX Bounce House and Inflatable Rentals";
      pageDescription = "Find answers to frequently asked questions about SATX Bounce House and Inflatable Rentals in San Antonio, TX. Learn about our services, rentals, and more.";
    } else if (normalizedPath === "/about") {
      // About page specific head elements
      pageTitle = "About Us - SATX Bounce House and Inflatable Rentals";
      pageDescription = "Learn about SATX Bounce House and Inflatable Rentals in San Antonio, TX. Read about our story and why you should choose us for your next event.";
    } else if (normalizedPath === '/blogs') {
      pageTitle = "Blog - SATX Bounce House and Inflatable Rentals";
      pageDescription = "Read our latest blog posts about bounce houses, party planning, and more from SATX Bounce House and Inflatable Rentals in San Antonio, TX.";
    }

    if (normalizedPath.startsWith('/blogs/')) {
      if (blogData) {
        console.log("Processing blog data:", blogData);
        pageTitle = `${blogData.title} - SATX Bounce House and Inflatable Rentals`;
        pageDescription = blogData.excerpt || "Read our blog post from SATX Bounce House and Inflatable Rentals in San Antonio, TX.";
        if (blogData.featuredImage) {
          pageImage = getAbsoluteImageUrl(blogData.featuredImage);
        } else {
          console.log("No featured image found in blog data");
          pageImage = defaultImage;
        }
        console.log("Set page image to:", pageImage);
      } else {
        console.log("Blog data not found");
        pageTitle = "Blog Post - SATX Bounce House and Inflatable Rentals";
        pageDescription = "Read our blog post from SATX Bounce House and Inflatable Rentals in San Antonio, TX.";
        pageImage = defaultImage;
      }
    }

    if (normalizedPath.startsWith('/products/')) {
      if (productData) {
        console.log("Processing product data:", productData);
        pageTitle = `${productData.name} - SATX Bounce House and Inflatable Rentals`;
        pageDescription = productData.description.substring(0, 160) || "View our product from SATX Bounce House and Inflatable Rentals in San Antonio, TX.";
        if (productData.images && productData.images.length > 0) {
          pageImage = getAbsoluteImageUrl(productData.images[0].url);
        } else {
          console.log("No image found in product data");
          pageImage = defaultImage;
        }
        console.log("Set page image to:", pageImage);
      } else {
        console.log("Product data not found");
        pageTitle = "Product - SATX Bounce House and Inflatable Rentals";
        pageDescription = "View our product from SATX Bounce House and Inflatable Rentals in San Antonio, TX.";
        pageImage = defaultImage;
      }
    }

    // Ensure pageImage is always defined
    pageImage = getAbsoluteImageUrl(pageImage);
    console.log("Final Page Image:", pageImage);

    return escapeInject`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="${pageDescription}">
          <meta name="keywords" content="bounce house rental San Antonio, San Antonio bounce house rentals, inflatable rentals, water slide rental, party rentals, event rentals, satx bounce">        
          <meta name="author" content="SATX Bounce House Rentals and More">
          <meta name="robots" content="index, follow">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
          <meta property="og:title" content="${pageTitle}">
          <meta property="og:description" content="${pageDescription}">
          <meta property="og:image" content="${pageImage}">
          <meta property="og:url" content="https://www.satxbounce.com${normalizedPath}">
          <meta property="og:type" content="website">
          <meta property="og:site_name" content="SATX Bounce House Rentals and More">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:site" content="@satxbounce">
          <meta name="twitter:creator" content="@satxbounce">
          <meta name="twitter:title" content="${pageTitle}">
          <meta name="twitter:description" content="${pageDescription}">
          <meta name="twitter:image" content="${pageImage}">
          <meta name="twitter:image:alt" content="SATX Bounce House Rentals and More">
          <link rel="icon" type="image/x-icon" href="/favicon.ico">
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
          <link rel="manifest" href="/site.webmanifest">
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
          ${headWithGtagHtml}
          <title>${pageTitle}</title>
        </head>
        <body>
          <!-- Google Tag Manager (noscript) -->
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${import.meta.env.VITE_GTM_ID}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          <!-- End Google Tag Manager (noscript) -->
          <div id="page-view">${dangerouslySkipEscape(viewHtml)}</div>
        </body>
      </html>`;
  } catch (error) {
    console.error('Error rendering page:', error);
    return {
      documentHtml: escapeInject`<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Error</title>
            </head>
            <body>
              <h1>500 Internal Server Error</h1>
              <p>Something went wrong. Please try again later.</p>
            </body>
          </html>`,
      pageContext: {
        httpResponse: {
          statusCode: 500
        }
      }
    };
  }
}