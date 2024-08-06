// components/BlogPost.jsx
import React, { useState, useEffect } from 'react';

function BlogPost({ slug }) {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("BlogPost received slug:", slug);

    useEffect(() => {
        if (!slug) {
            setError('No slug provided');
            setLoading(false);
            return;
        }

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/blogs/${slug}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBlog(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!blog) return <div>Blog post not found</div>;

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    );
}

export default BlogPost;