export { Page }

import React from 'react'

import Hero from '../../components/Hero'
import LeadForm from '../../components/LeadForm'
// import Carousel from '../../components/CarouselComponent'
// import About from '../../components/About'

function Page(props) {

  return (

    <div className='home-page-component'>
      <div className="home-page-container">
        <Hero props={props} />
        {/* <Carousel /> */}
        <LeadForm />
        {/* <About /> */}
      </div>
    </div>
  )
}
