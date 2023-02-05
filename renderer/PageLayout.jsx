export { PageLayout }

import React from 'react'
import './PageLayout.css'

import Navigation from '../components/Navigation'

function PageLayout({ children }) {
  return (
    <React.StrictMode>
      <Navbar>
        <Navigation />
      </Navbar>
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </React.StrictMode>
  )
}

function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

function Navbar({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

function Content({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}
