import React from 'react';

function BlogList({ blogs, onEdit, onDelete }) {
    return (
        <div className="blog-list">
            <h2>Blog Posts</h2>
            {blogs.map(blog => (
                <div key={blog._id} className="blog-item">
                    <h3>{blog.title} {blog.status === 'draft' && <span>(Draft)</span>}</h3>
                    <p>Slug: {blog.slug}</p>
                    <p>Status: {blog.status}</p>
                    <button onClick={() => onEdit(blog)}>Edit</button>
                    <button onClick={() => onDelete(blog.slug)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default BlogList;