export { PageLayout }

import React from 'react'
import './PageLayout.css'
import Navigation from '../components/Navigation'
// import Bottom from '../components/Bottom'


function PageLayout({ children }) {
  return (
    <React.StrictMode>
      <div className="App">
        <Navigation name="Bounce SATX" />
        {children}
        {/* <Bottom /> */}
      </div>
    </React.StrictMode>
  )
}