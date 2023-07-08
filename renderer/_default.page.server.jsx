export { render }

import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { PageLayout } from './PageLayout'

import HeadWithGtag from '../components/HeadWithGtag'

async function render(pageContext) {
  const { Page } = pageContext;
  const viewHtml = dangerouslySkipEscape(
    renderToString(
      <PageLayout>
        <Page />
      </PageLayout>
    )
  );

  const headWithGtagHtml = dangerouslySkipEscape(renderToString(<HeadWithGtag />));

  let pageTitle = "SATX Bounce House & Inflatable Rentals - San Antonio, TX";
  let pageDescription = "SATX Bounce House & Party Rentals in San Antonio. High-quality and affordable bounce house, inflatable, and event rentals for your events. Book now!";

  if (pageContext.urlPathname === "/") {
    // Homepage specific head elements
    pageTitle = "SATX Bounce House & Inflatable Rentals - San Antonio, TX - Homepage";
    pageDescription = "SATX Bounce House & Party Rentals in San Antonio. High-quality and affordable bounce house, inflatable, and event rentals for your events. Book now!";
  } else if (pageContext.urlPathname === "/faq") {
    // FAQ page specific head elements
    pageTitle = "SATX Bounce House & Inflatable Rentals - San Antonio, TX - FAQ";
    pageDescription = "Find answers to frequently asked questions about SATX Bounce House & Inflatable Rentals in San Antonio, TX. Learn more about our services, rental options, pricing, and how to make reservations. Get all the information you need to plan your next event or party with us.";
  }

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${pageDescription}">
        <meta name="author" content="SATX Bounce House Rentals and More">
        <meta name="robots" content="index, follow">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <meta property="og:title" content="${pageTitle}">
        <meta property="og:description" content="${pageDescription}">
        <meta property="og:image" content="https://www.satxbounce.com/satx-bounce-house-rental-san-antonio-og-image.jpg">
        <meta property="og:url" content="https://www.satxbounce.com">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="SATX Bounce House Rentals and More">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@satxbounce">
        <meta name="twitter:creator" content="@satxbounce">
        <meta name="twitter:title" content="${pageTitle}">
        <meta name="twitter:description" content="${pageDescription}">
        <meta name="twitter:image" content="https://www.satxbounce.com/satx-bounce-house-rental-san-antonio-og-image.jpg">
        <meta name="twitter:image:alt" content="SATX Bounce House Rentals and More">
        <link rel="icon" type="image/x-icon" href="favicon.ico">
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
        <link rel="sitemap" type="application/xml" href="sitemap.xml" />
        ${headWithGtagHtml}
        <title>${pageTitle}</title>
      </head>
      <body>
        <div id="page-view">${viewHtml}</div>
      </body>
    </html>`;
}
