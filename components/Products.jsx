// components/Products.jsx
import React, { useState, useEffect } from 'react';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to truncate HTML content
    const truncateHTML = (html, maxLength) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        if (tmp.textContent.length <= maxLength) return html;

        let truncated = "";
        const walk = document.createTreeWalker(tmp, NodeFilter.SHOW_TEXT, null, false);
        while (walk.nextNode()) {
            const node = walk.currentNode;
            if (truncated.length + node.length <= maxLength) {
                truncated += node.textContent;
            } else {
                truncated += node.textContent.slice(0, maxLength - truncated.length);
                break;
            }
        }
        return truncated + "...";
    };

    return (
        <div className="products-container">
            <h1>Our Products</h1>
            <div className="product-grid">
                {currentProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.images[0]?.url
                                ? `${import.meta.env.VITE_SERVER_URL}/${product.images[0].url}`
                                : '/placeholder-image.jpg'}
                            alt={product.name}
                            className="product-image"
                        />
                        <div className="product-content">
                            <h2 className="product-title">
                                <a href={`/products/${product.slug}`} className="product-link">{product.name}</a>
                            </h2>
                            <p className="product-price">${product.price.base} {product.price.currency}</p>
                            <div
                                className="product-description"
                                dangerouslySetInnerHTML={{ __html: truncateHTML(product.description, 100) }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastProduct >= products.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Products;