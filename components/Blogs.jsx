// components/Blogs.jsx
import React, { useState, useEffect } from 'react';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBlogs(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Blog Posts</h1>
            {blogs.map(blog => (
                <div key={blog._id}>
                    <h2>
                        <a href={`/blogs/${blog._id}`}>{blog.title}</a>
                    </h2>
                    <p>{blog.content.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}

export default Blogs;