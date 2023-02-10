import React from 'react'

export default function IconSection() {
    return (
        <div className='icon-component'>
            <div className='icon-section'>
                <h2>Why Choose Us?</h2>
                <div className="icon-container">
                    <div className='icon-section__icon'>
                        <img src='/images/sample-icon.png' alt='icon1' height={50} width={50} />
                        <h3>Lorem ipsum</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla totam quae vitae eveniet corrupti facilis expedita dolorum.</p>
                    </div>

                    <div className='icon-section__icon'>
                        <img src='/images/sample-icon.png' alt='icon2' height={50} width={50} />
                        <h3>Lorem ipsum</h3>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla totam quae vitae eveniet corrupti facilis expedita dolorum.</p>

                    </div>
                    <div className='icon-section__icon'>
                        <img src='/images/sample-icon.png' alt='icon3' height={50} width={50} />
                        <h3>Lorem ipsum</h3>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla totam quae vitae eveniet corrupti facilis expedita dolorum.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}