/**
 * Exports the render function.
 * 
 * Render function that hydrates the React app on the client.
 *
 * @param {Object} pageContext - Context data for the page.
 *
 * It does the following:
 *
 * 1. Destructures the Page component from pageContext.
 * 2. Calls ReactDOM's hydrateRoot method to hydrate the React app.
 * 3. Renders the PageLayout and Page components. 
 * 4. Passes pageContext as props to Page.
 *
 * This hydrates the app after the HTML is loaded on the client, 
* connecting the rendered HTML to the React components.
*/

export { render }

import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { PageLayout } from './PageLayout'

async function render(pageContext) {
  const { Page } = pageContext
  hydrateRoot(
    document.getElementById('page-view'),
    <PageLayout>
      <Page props={pageContext} />
    </PageLayout>
  )
}
