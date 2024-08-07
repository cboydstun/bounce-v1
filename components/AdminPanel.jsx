import React, { useState, useEffect } from 'react';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
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

    const handleCreate = async (blogData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Make sure this line is present
                },
                body: JSON.stringify(blogData),
            });
            if (!response.ok) {
                const errorData = await response.json();
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

    const handleUpdate = async (slug, blogData) => {
        try {
            console.log('Updating blog with data:', blogData);
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update blog');
            }
            const updatedBlog = await response.json();
            console.log('Updated blog:', updatedBlog);
            setBlogs(blogs.map(b => b.slug === slug ? updatedBlog : b));
            setSelectedBlog(null);
        } catch (error) {
            console.error('Error updating blog:', error);
            alert(error.message);
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
                <BlogForm
                    blog={selectedBlog}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                />
            </div>
        </div>
    );
}

export default AdminPanel;

