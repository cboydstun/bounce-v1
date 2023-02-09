export { PageLayout }

import React from 'react'
import './PageLayout.css'
import Navigation from '../components/Navigation'
// import Bottom from '../components/Bottom'


function PageLayout({ children }) {
  return (
    <React.StrictMode>
      <Layout test="top level test">
        <Navigation name="Bounce SATX" />
        {children}
        {/* <Bottom /> */}
      </Layout>
    </React.StrictMode>
  )
}

function Layout({ children }) {
  return (
    <div className='App'>
      {children}
    </div>
  )
}
