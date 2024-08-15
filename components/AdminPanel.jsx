// components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import ErrorBoundary from './ErrorBoundary';

import './AdminPanel.css';

function AdminPanel() {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
            } else {
                setIsAuthenticated(true);
                fetchBlogs();
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleCreate = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create blog');
            }

            const newBlog = await response.json();
            setBlogs([...blogs, newBlog]);
            setSelectedBlog(null); // Reset selected blog after creation
            alert('Blog created successfully!');
        } catch (error) {
            console.error('Error creating blog:', error);
            alert(error.message);
        }
    };

    const handleUpdate = async (slug, formData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs/${slug}`, {
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

            const updatedBlog = await response.json();
            setBlogs(prevBlogs => prevBlogs.map(blog => blog.slug === slug ? updatedBlog : blog));
            setSelectedBlog(null); // Reset selected blog after update
            alert('Blog updated successfully!');
        } catch (error) {
            console.error('Error in handleUpdate:', error);
            alert(`Error updating blog: ${error.message}`);
        }
    };

    const handleReset = () => {
        setSelectedBlog(null);
    };

    const handleDelete = async (slug) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs/${slug}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete blog');
            }

            // Remove the deleted blog from the local state
            setBlogs(blogs.filter(blog => blog.slug !== slug));
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert(error.message);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // or a loading spinner
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="admin-panel">
            <h1>Blog Management</h1>
            <div className="admin-content">
                <BlogList
                    blogs={blogs}
                    onEdit={setSelectedBlog}
                    onDelete={handleDelete}
                />
                <ErrorBoundary>
                    <BlogForm
                        blog={selectedBlog}
                        onCreate={handleCreate}
                        onUpdate={handleUpdate}
                        onReset={handleReset}
                    />
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default AdminPanel;