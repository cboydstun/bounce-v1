// components/BlogPost.jsx
import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

import './BlogPost.css';

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

    console.log("BlogPost rendered with blog:", blog);

    // Function to get image URL
    const getImageUrl = (image) => {
        if (!image) return '';
        return `${import.meta.env.VITE_SERVER_URL}/${image.path.replace(/\\/g, '/')}`;
    };

    return (
        <article className="blog-post">
            <h1 className="blog-title">{blog.title}</h1>
            {blog.images[0] && (
                <img src={getImageUrl(blog.images[0])} alt={blog.title} className="blog-image" />
            )}
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.introduction }}
            />
            {blog.images[1] && (
                <img src={getImageUrl(blog.images[1])} alt={blog.title} className="blog-image" />
            )}
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.body }}
            />
            {blog.images[2] && (
                <img src={getImageUrl(blog.images[2])} alt={blog.title} className="blog-image" />
            )}
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.conclusion }}
            />
            <ContactForm />
        </article>
    );
}

export default BlogPost;