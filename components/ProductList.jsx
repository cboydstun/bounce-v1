// components/ProductList.jsx
import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
    console.log("// ProductList.js products", products);

    return (
        <div className="product-list">
            <h2>Products</h2>
            {products.map(product => (
                <div key={product._id || product.slug} className="product-item">
                    <h3>{product.name} {product.availability !== 'available' && <span>({product.availability})</span>}</h3>
                    <p>Slug: {product.slug || 'N/A'}</p>
                    <p>Price: ${product.price.base} {product.price.currency}</p>
                    <button onClick={() => onEdit(product)}>Edit</button>
                    <button onClick={() => onDelete(product.slug)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ProductList;