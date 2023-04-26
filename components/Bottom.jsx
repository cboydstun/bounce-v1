import React from 'react'

export default function Bottom() {
  return (
    <footer>
      <div className="bottom-component">
        <div className="bottom-container">
          <h3>See you at the party! 🥳</h3>
          <p>© 2023 <a href="mailto:satxbounce@gmail.com">SATX Bounce</a>
            <a href="https://www.facebook.com/profile.php?id=100092313486945" target="_blank" rel="noopener noreferrer" aria-label='SATX Bounce on Facebook Social Media App' style={{ marginLeft: '10px' }}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/satxbounce" target="_blank" rel="noopener noreferrer" aria-label='SATX Bounce on Twitter Social Media App' style={{ marginLeft: '10px' }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://nextdoor.com/pages/satx-bounce-san-antonio-tx/" target="_blank" rel="noopener noreferrer" aria-label='SATX Bounce on Nextdoor Social Media App' style={{ marginLeft: '10px' }}>
              <i className="fa-solid fa-house-chimney fa-flip-horizontal"></i>
            </a>

            <a href="https://goo.gl/maps/JxW8ggQbXubbgsWZ8" target="_blank" rel="noopener noreferrer" aria-label='SATX Bounce on Google My Business' style={{ marginLeft: '10px' }}>
              <i className="fab fa-google"></i>
            </a>
          </p>
          
        </div>
      </div>
    </footer>
  )
}
