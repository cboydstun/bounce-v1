export { PageLayout }

import React from 'react'

import './PageLayout.css'
import Navigation from '../components/Navigation'
import Bottom from '../components/Bottom'
import ZipCodeModal from '../components/ZipCodeModal'

function PageLayout({ children }) {

  console.log(children.props.props)

  return (
    <React.StrictMode>
      <div className="App">
        <ZipCodeModal />
        <Navigation name="Bounce SATX" />
        {children}
        <Bottom />
      </div>
    </React.StrictMode>
  )
}