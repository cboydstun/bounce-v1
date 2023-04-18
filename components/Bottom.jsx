import React from 'react'

export default function Bottom() {
  return (
    <footer>
      <div className="bottom-component">
        <div className="bottom-container">
          <h2>See you at the party! 🥳</h2>
          <p>© 2023 <a href="mailto:satxbounce@gmail.com">SATX Bounce</a>
            <a href="https://www.facebook.com/profile.php?id=100091608496923" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/satxbounce" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://nextdoor.com/pages/satx-bounce-san-antonio-tx/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
              <i className="fa-solid fa-house-chimney fa-flip-horizontal"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
