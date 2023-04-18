import React, { useState, useEffect } from 'react';
// import './FeaturedGif.css';

const fallbackImage = 'https://acpentertainment.com/wp-content/uploads/2021/01/Lansing-inflatable-obstacle-course-rental-1024x832.jpg';
const gifUrl = 'https://media.giphy.com/media/SvEld3bXYTE7ondKFJ/giphy.gif';

export default function Graphic() {
    const [imgSrc, setImgSrc] = useState(fallbackImage);

    useEffect(() => {
        const img = new Image();
        img.src = gifUrl;
        img.onload = () => setImgSrc(gifUrl);
    }, []);

    return (
        <div className="featured-gif-component">
            <img src={imgSrc} alt="Featured" className="featured-image" />
        </div>
    );
}
