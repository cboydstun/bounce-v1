export { Page }

import React from 'react'

import Hero from '../../components/Hero'
import LeadForm from '../../components/LeadForm'


function Page() {
  return (

    <div className='home-page'>
      <div className="home-page-container">
        <Hero />
        <LeadForm />
      </div>
    </div>
  )
}
