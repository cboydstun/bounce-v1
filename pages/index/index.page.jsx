export { Page }

import React from 'react'

import Navigation from '../../components/Navigation'
import Hero from '../../components/Hero'
import LeadForm from '../../components/LeadForm'
import Carousel from '../../components/CarouselComponent'
// import About from '../../components/About'
// import Bottom from '../../components/Bottom'


function Page() {
  return (

    <div className='home-page'>
      <div className="home-page-container">
        <Navigation />
        <Hero />
        {/* <Carousel /> */}
        <LeadForm />
        {/* <About />
        <Bottom /> */}
      </div>
    </div>
  )
}
