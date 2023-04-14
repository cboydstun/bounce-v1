export { render }

import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { PageLayout } from './PageLayout'

import HeadWithGtag from '../components/HeadWithGtag'

async function render(pageContext) {
  const { Page } = pageContext
  const viewHtml = dangerouslySkipEscape(
    renderToString(
      <PageLayout>
        <Page />
      </PageLayout>
    )
  )

  const headWithGtagHtml = dangerouslySkipEscape(renderToString(<HeadWithGtag />));

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="SATX Bounce House & Party Rentals in San Antonio. Get high-quality and affordable rentals for your events. Book now!">
      <meta name="keywords" content="SATX Bounce House Rentals, party rentals, San Antonio, affordable rentals, event rentals">
      <meta name="author" content="SATX Bounce House Rentals and More">
      <meta name="robots" content="index, follow">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <meta property="og:title" content="SATX Bounce House Rentals and More - Affordable Party Rentals in San Antonio">
      <meta property="og:description" content="Get high-quality and affordable bounce house & party rentals in San Antonio with SATX Bounce House Rentals and More. Book now!">
      <meta property="og:image" content="https://www.funasfam.com/wp-content/uploads/2023/04/OG-image-min-v2-min.jpg">
      <meta property="og:url" content="https://www.satxbounce.com">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="SATX Bounce House Rentals and More">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:site" content="@satxbounce">
      <meta name="twitter:creator" content="@satxbounce">
      <meta name="twitter:title" content="SATX Bounce House Rentals and More - Affordable Party Rentals in San Antonio">
      <meta name="twitter:description" content="Get high-quality and affordable bounce house & party rentals in San Antonio with SATX Bounce House Rentals and More. Book now!">
      <meta name="twitter:image" content="https://www.funasfam.com/wp-content/uploads/2023/04/OG-image-min-v2-min.jpg">
      <meta name="twitter:image:alt" content="SATX Bounce House Rentals and More">
      ${headWithGtagHtml}
      <title>SATX Bounce House Rentals and More - Affordable Party Rentals in San Antonio</title>
    </head>
      <body>
        <div id="page-view">${viewHtml}</div>
      </body>
    </html>`
}
