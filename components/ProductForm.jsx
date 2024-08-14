// components/ProductForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import DynamicQuillEditor from './DynamicQuillEditor';
import './ProductForm.css';

function ProductForm({ product, onCreate, onUpdate }) {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: {
            base: '',
            currency: 'USD'
        },
        category: '',
        rentalDuration: 'full-day',
        availability: 'available',
        specifications: [],
        dimensions: {
            length: '',
            width: '',
            height: '',
            unit: 'feet'
        },
        capacity: '',
        ageRange: {
            min: '',
            max: ''
        },
        setupRequirements: {
            space: '',
            powerSource: false,
            surfaceType: []
        },
        features: [],
        safetyGuidelines: '',
        weatherRestrictions: []
    });
    const [images, setImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (product) {
            setFormData({
                ...product,
                setupRequirements: {
                    ...product.setupRequirements,
                    surfaceType: product.setupRequirements?.surfaceType?.join(', ') || ''
                },
                features: product.features?.join(', ') || '',
                weatherRestrictions: product.weatherRestrictions?.join(', ') || ''
            });
            setImages(product.images?.map(img => ({
                _id: img._id,
                name: img.url.split('/').pop(),
                preview: `${import.meta.env.VITE_SERVER_URL}/${img.url}`,
                existing: true
            })) || []);
            setRemovedImages([]);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => {
            if (name.includes('.')) {
                const [key, subKey] = name.split('.');
                return {
                    ...prevData,
                    [key]: {
                        ...prevData[key],
                        [subKey]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
                    }
                };
            }
            return {
                ...prevData,
                [name]: type === 'checkbox' ? checked : (type === 'number' ? (value === '' ? '' : parseFloat(value)) : value)
            };
        });
    };

    const handleQuillChange = (content, editor) => {
        const name = editor.container.dataset.name;
        setFormData(prevData => ({
            ...prevData,
            [name]: content
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            name: file.name,
            preview: URL.createObjectURL(file),
            file
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleImageRemove = (index) => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            const removedImage = newImages.splice(index, 1)[0];
            if (removedImage.existing && removedImage._id) {
                setRemovedImages(prev => [...prev, removedImage._id]);
            }
            return newImages;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitFormData = new FormData();

        const jsonData = {
            ...formData,
            setupRequirements: {
                ...formData.setupRequirements,
                surfaceType: formData.setupRequirements.surfaceType.split(',').map(item => item.trim()).filter(Boolean)
            },
            features: formData.features.split(',').map(item => item.trim()).filter(Boolean),
            weatherRestrictions: formData.weatherRestrictions.split(',').map(item => item.trim()).filter(Boolean),
            removedImages
        };
        submitFormData.append('productData', JSON.stringify(jsonData));

        images.forEach((image, index) => {
            if (image.file) {
                submitFormData.append('images', image.file);
            } else if (image.existing) {
                submitFormData.append('existingImages', JSON.stringify(image));
            }
        });

        try {
            if (product) {
                const updatedProduct = await onUpdate(submitFormData);
                console.log('Product updated:', updatedProduct);
                alert('Product updated successfully!');
            } else {
                const newProduct = await onCreate(submitFormData);
                console.log('New product created:', newProduct);
                alert('Product created successfully!');
            }
        } catch (error) {
            console.error('Error submitting product:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>{product ? 'Edit Product' : 'Create New Product'}</h2>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
            />
            <DynamicQuillEditor
                value={formData.description}
                onChange={handleQuillChange}
                placeholder="Write your product description here..."
                name="description"
            />
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
            />
            <input
                type="number"
                name="price.base"
                value={formData.price.base}
                onChange={handleChange}
                placeholder="Price"
                required
                min="0"
                step="0.01"
            />
            <select
                name="price.currency"
                value={formData.price.currency}
                onChange={handleChange}
                required
            >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
            </select>
            <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
            >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="maintenance">Maintenance</option>
                <option value="retired">Retired</option>
            </select>
            <input
                type="number"
                name="dimensions.length"
                value={formData.dimensions.length}
                onChange={handleChange}
                placeholder="Length"
                required
                min="0"
                step="0.01"
            />
            <input
                type="number"
                name="dimensions.width"
                value={formData.dimensions.width}
                onChange={handleChange}
                placeholder="Width"
                required
                min="0"
                step="0.01"
            />
            <input
                type="number"
                name="dimensions.height"
                value={formData.dimensions.height}
                onChange={handleChange}
                placeholder="Height"
                required
                min="0"
                step="0.01"
            />
            <select
                name="dimensions.unit"
                value={formData.dimensions.unit}
                onChange={handleChange}
                required
            >
                <option value="feet">Feet</option>
                <option value="meters">Meters</option>
            </select>
            <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                required
                min="1"
            />
            <input
                type="number"
                name="ageRange.min"
                value={formData.ageRange.min}
                onChange={handleChange}
                placeholder="Minimum Age"
                required
                min="0"
            />
            <input
                type="number"
                name="ageRange.max"
                value={formData.ageRange.max}
                onChange={handleChange}
                placeholder="Maximum Age"
                required
                min="0"
            />
            <input
                type="text"
                name="setupRequirements.space"
                value={formData.setupRequirements.space}
                onChange={handleChange}
                placeholder="Setup Space Requirements"
                required
            />
            <input
                type="text"
                name="setupRequirements.surfaceType"
                value={formData.setupRequirements.surfaceType}
                onChange={handleChange}
                placeholder="Surface Types (comma-separated)"
            />
            <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Features (comma-separated)"
            />
            <textarea
                name="safetyGuidelines"
                value={formData.safetyGuidelines}
                onChange={handleChange}
                placeholder="Safety Guidelines"
                required
            />
            <input
                type="text"
                name="weatherRestrictions"
                value={formData.weatherRestrictions}
                onChange={handleChange}
                placeholder="Weather Restrictions (comma-separated)"
            />
            <input
                type="file"
                onChange={handleImageUpload}
                multiple
                ref={fileInputRef}
            />
            <div className="image-preview-container">
                {images.map((image, index) => (
                    <div key={index} className="image-preview-item">
                        <img
                            src={image.preview}
                            alt={image.name}
                            className="image-preview"
                            crossOrigin="anonymous"
                        />
                        <button type="button" onClick={() => handleImageRemove(index)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <button type="submit">{product ? 'Update' : 'Create'}</button>
        </form>
    );
}

export default ProductForm;