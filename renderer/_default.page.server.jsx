export { render }

import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { PageLayout } from './PageLayout'

async function render(pageContext) {
  const { Page } = pageContext
  const viewHtml = dangerouslySkipEscape(
    renderToString(
      <PageLayout>
        <Page />
      </PageLayout>
    )
  )

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Language" content="en" />
      <meta name="language" content="English" />
      <meta name="author" content="SATX Bounce House Rentals and More" />
      <meta name="keywords" content="SATX Bounce House Rentals and More" />
      
      
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google" content="notranslate" />
      <meta name="google-site-verification" content="SATX Bounce House Rentals and More" />
      <meta name="msvalidate.01" content="SATX Bounce House Rentals and More" />
      <meta name="yandex-verification" content="SATX Bounce House Rentals and More" />
      <meta name="p:domain_verify" content="SATX Bounce House Rentals and More" />
      <meta name="norton-safeweb-site-verification" content="SATX Bounce House Rentals and More" />
      <meta name="alexaVerifyID" content="SATX Bounce House Rentals and More" />
      

      <meta property="og:title" content="SATX Bounce House Rentals and More" />
      <meta property="og:description" content="SATX Bounce House Rentals and More" />
      <meta property="og:image" content="https://www.satxbounce.com/images/og-image.png" />
      <meta property="og:url" content="https://www.satxbounce.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SATX Bounce House Rentals and More" />


      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@satxbouncers" />
      <meta name="twitter:creator" content="@satxbouncers" />
      <meta name="twitter:title" content="SATX Bounce House Rentals and More" />
      <meta name="twitter:description" content="SATX Bounce House Rentals and More" />
      <meta name="twitter:image" content="https://www.satxbounce.com/images/og-image.png" />
      <meta name="twitter:image:alt" content="SATX Bounce House Rentals and More" />
      <meta name="description" content="SATX Bounce House & Party Rentals in San Antonio" />

      <title>SATX Bounce House Rentals and More</title>
    </head>
      <body>
        <div id="page-view">${viewHtml}</div>
      </body>
    </html>`
}
