// AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import ErrorBoundary from './ErrorBoundary';

import './AdminPanel.css';

// logout button component
function LogoutButton() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };
    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

function AdminPanel() {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            setIsAuthenticated(true);
            fetchBlogs();
        }
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

            console.log('Sending blog data to server:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error response:', errorData);
                throw new Error(errorData.error || 'Failed to create blog');
            }

            const newBlog = await response.json();
            setBlogs([...blogs, newBlog]);
            // Reset form or close modal if needed
        } catch (error) {
            console.error('Error creating blog:', error);
            alert(error.message);
        }
    };

    const handleUpdate = async (slug, formData) => {
        try {
            console.log('Attempting to update blog:', slug);
            console.log('Update data:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs/${slug}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
            }

            const updatedBlog = await response.json();
            console.log('Update successful:', updatedBlog);

            setBlogs(prevBlogs => prevBlogs.map(blog => blog.slug === slug ? updatedBlog : blog));

            alert('Blog updated successfully!');

        } catch (error) {
            console.error('Error in handleUpdate:', error);
            console.error('Error details:', error.message);
            alert(`Error updating blog: ${error.message}`);
        }
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

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <LogoutButton />
            <div className="admin-content">
                <BlogList
                    blogs={blogs}
                    onEdit={setSelectedBlog}
                    onDelete={handleDelete}
                />
                <ErrorBoundary>
                    <BlogForm blog={selectedBlog} onCreate={handleCreate} onUpdate={handleUpdate} />
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default AdminPanel;
