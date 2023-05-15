import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = Array(5).fill(0).map((_, i) => `../satx-bounce-house-rental-san-antonio-review-${i + 1}.png`);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(intervalId); // Clean up interval on unmount
    }, [currentIndex, images.length]);

    return (
        <div className="carousel-container">
            <div className="carousel">
                <a href="https://g.page/r/CRD8_XzLRehLEB0" target="_blank" rel="noopener noreferrer">
                    <img className="carousel__image" src={images[currentIndex]} alt={`Review ${currentIndex + 1}`} />
                </a>
            </div>
        </div>
    );
};

export default Reviews;