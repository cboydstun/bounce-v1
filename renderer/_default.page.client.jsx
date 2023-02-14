export { render }

import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { PageLayout } from './PageLayout'

import { Analytics } from '@vercel/analytics/react';

async function render(pageContext) {
  const { Page } = pageContext
  hydrateRoot(
    document.getElementById('page-view'),
      <PageLayout>
        <Page props={pageContext} />
        <Analytics />
      </PageLayout>
  )
}
