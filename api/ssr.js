/**
 * Handler function that renders server-side pages.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * 
 * This function does the following:
 * 
 * 1. Gets the requested URL from the request object.
 * 2. Calls renderPage() to generate the pageContext for rendering.
 * 3. Checks if pageContext contains a httpResponse.
 * 4. If no httpResponse, sends empty 200 response.
 * 5. Otherwise extracts response details from httpResponse.
 * 6. Sets status code, content type, and body on response object.
 * 7. Sends back the rendered response.
 */

import { renderPage } from 'vite-plugin-ssr'

export default async function handler(req, res) {
  const { url } = req
  console.log('Request to url:', url)

  const pageContextInit = { url }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext

  if (!httpResponse) {
    res.statusCode = 200
    res.end()
    return
  }

  const { body, statusCode, contentType } = httpResponse
  res.statusCode = statusCode
  res.setHeader('content-type', contentType)
  res.end(body)
}

