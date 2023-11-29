// page for lime waterslide
export { Page }

import React from 'react'

import Hero from '../../components/Hero'

function Page(props) {

    return (
        <div className='home-page-component'>
            <div className="home-page-container">
                <Hero props={props} />
            </div>
        </div>
    )
}