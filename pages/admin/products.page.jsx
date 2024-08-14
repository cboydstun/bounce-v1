// pages/admin/products.page.jsx
import React, { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList';
import ProductForm from '../../components/ProductForm';
import ErrorBoundary from '../../components/ErrorBoundary';
import DashboardLayout from '../../components/DashboardLayout';

import './products.css';

export { Page };

function ProductsManagement() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
            } else {
                setIsAuthenticated(true);
                fetchProducts();
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCreate = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create product');
            }

            const newProduct = await response.json();
            setProducts(prevProducts => [...prevProducts, newProduct]);
            return newProduct;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    };

    const handleUpdate = async (slug, formData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/${slug}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
            }

            const updatedProduct = await response.json();
            setProducts(prevProducts => prevProducts.map(product =>
                product.slug === slug ? updatedProduct : product
            ));
            return updatedProduct;
        } catch (error) {
            console.error('Error in handleUpdate:', error);
            throw error;
        }
    };

    const handleDelete = async (slug) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/${slug}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete product');
            }

            setProducts(products.filter(product => product.slug !== slug));
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(error.message);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="products-panel">
            <h1>Product Management</h1>
            <div className="products-content">
                <ProductList
                    products={products}
                    onEdit={setSelectedProduct}
                    onDelete={handleDelete}
                />
                <ErrorBoundary>
                    <ProductForm
                        product={selectedProduct}
                        onCreate={handleCreate}
                        onUpdate={(formData) => handleUpdate(selectedProduct.slug, formData)}
                    />
                </ErrorBoundary>
            </div>
        </div>
    );
}

function Page() {
    return (
        <DashboardLayout>
            <ProductsManagement />
        </DashboardLayout>
    );
}