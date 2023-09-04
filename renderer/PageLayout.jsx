/**
 * PageLayout component renders the common page wrapper and layout.
 * 
 * @component
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to render inside the page layout
 * 
 * @returns {ReactComponent} React component
 */

import React from 'react'

import './PageLayout.css'
import Navigation from '../components/Navigation'
import Bottom from '../components/Bottom'

function PageLayout({ children }) {
  return (
    <React.StrictMode>
      <div className="App">
        <Navigation />
        {children}
        <Bottom />
      </div>
    </React.StrictMode>
  )
}

export { PageLayout }
