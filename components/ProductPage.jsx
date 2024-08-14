// components/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

import './ProductPage.css';

function ProductPage({ slug }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("ProductPage received slug:", slug);

    useEffect(() => {
        if (!slug) {
            setError('No slug provided');
            setLoading(false);
            return;
        }

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/${slug}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    console.log("ProductPage rendered with product:", product);

    // Function to get image URL
    const getImageUrl = (image) => {
        if (!image) return '';
        return `${import.meta.env.VITE_SERVER_URL}/${image.url.replace(/\\/g, '/')}`;
    };

    return (
        <article className="product-page">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-images">
                {product.images.map((image, index) => (
                    <img key={index} src={getImageUrl(image)} alt={product.name} className="product-image" />
                ))}
            </div>
            <div className="product-details">
                <p className="product-price">${product.price.base} {product.price.currency}</p>
                <p className="product-availability">Availability: {product.availability}</p>
                <div
                    className="product-description"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <div className="product-specifications">
                    <h2>Specifications</h2>
                    <ul>
                        <li>Dimensions: {product.dimensions.length}x{product.dimensions.width}x{product.dimensions.height} {product.dimensions.unit}</li>
                        <li>Capacity: {product.capacity}</li>
                        <li>Age Range: {product.ageRange.min} - {product.ageRange.max} years</li>
                    </ul>
                </div>
                <div className="product-setup">
                    <h2>Setup Requirements</h2>
                    <p>Space Needed: {product.setupRequirements.space}</p>
                    <p>Power Source Required: {product.setupRequirements.powerSource ? 'Yes' : 'No'}</p>
                    <p>Surface Types: {product.setupRequirements.surfaceType.join(', ')}</p>
                </div>
                <div className="product-features">
                    <h2>Features</h2>
                    <ul>
                        {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div className="product-safety">
                    <h2>Safety Guidelines</h2>
                    <div dangerouslySetInnerHTML={{ __html: product.safetyGuidelines }} />
                </div>
                <div className="product-weather">
                    <h2>Weather Restrictions</h2>
                    <ul>
                        {product.weatherRestrictions.map((restriction, index) => (
                            <li key={index}>{restriction}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <ContactForm />
        </article>
    );
}

export default ProductPage;