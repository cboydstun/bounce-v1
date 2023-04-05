import React, { useEffect } from 'react'

import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);

import './PageLayout.css'
import Navigation from '../components/Navigation'
import Bottom from '../components/Bottom'
import ZipCodeModal from '../components/ZipCodeModal'

function PageLayout({ children }) {
  useEffect(() => {
    ReactGA.send('page_view', {
      page_path: window.location.pathname + window.location.search
    });
  }, []);

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

export { PageLayout }
