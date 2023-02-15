export { PageLayout }

import React from 'react'

import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

import './PageLayout.css'
import Navigation from '../components/Navigation'
import Bottom from '../components/Bottom'
import ZipCodeModal from '../components/ZipCodeModal'

function PageLayout({ children }) {
  reportWebVitals(sendToVercelAnalytics);

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