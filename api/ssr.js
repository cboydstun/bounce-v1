import fetch from 'node-fetch';
import { renderPage } from 'vite-plugin-ssr'

export default async function handler(req, res) {
  const { url } = req
  console.log('Request to url:', url)

  // Make API call to retrieve blog data
  const blogs = await fetch('https://paparaz.me/api/v1/blogs').then((res) => res.json());

  const pageContextInit = { url, blogs } // Pass the blogs to the page context
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
