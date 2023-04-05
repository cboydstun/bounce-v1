import React from 'react'

import './PageLayout.css'
import Navigation from '../components/Navigation'
import Bottom from '../components/Bottom'
import ZipCodeModal from '../components/ZipCodeModal'

import HeadWithGtag from '../components/HeadWithGtag'


function PageLayout({ children }) {
  return (
    <React.StrictMode>
      <HeadWithGtag />
      <div className="App">
        <ZipCodeModal />
        <Navigation name="Bounce SATX" />
        {children}
        <Bottom />
      </div>
    </React.StrictMode>
  )
}

export { PageLayout }
