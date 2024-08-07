import React, { useState, useEffect } from 'react';

function BlogForm({ blog, onCreate, onUpdate }) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        categories: '',
        tags: '',
        status: 'draft',
        seo: { metaTitle: '', metaDescription: '', focusKeyword: '' },
        isFeature: false
    });

    useEffect(() => {
        if (blog) {
            setFormData({
                ...blog,
                categories: blog.categories?.join(', ') || '',
                tags: blog.tags?.join(', ') || '',
                seo: blog.seo || { metaTitle: '', metaDescription: '', focusKeyword: '' },
                isFeature: blog.isFeature || false
            });
        }
    }, [blog]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSEOChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            seo: {
                ...prevData.seo,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            categories: formData.categories.split(',').map(cat => cat.trim()),
            tags: formData.tags.split(',').map(tag => tag.trim())
        };
        console.log('Submitting form data:', submitData);
        if (blog) {
            onUpdate(blog.slug, submitData);
        } else {
            onCreate(submitData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="blog-form">
            <h2>{blog ? 'Edit Blog' : 'Create New Blog'}</h2>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Content"
                required
            />
            <input
                type="text"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Excerpt"
            />
            <input
                type="text"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                placeholder="Featured Image URL"
            />
            <input
                type="text"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                placeholder="Categories (comma-separated)"
            />
            <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Tags (comma-separated)"
            />
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
            >
                <option value="">Select Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>
            <input
                type="text"
                name="metaTitle"
                value={formData.seo.metaTitle}
                onChange={handleSEOChange}
                placeholder="SEO Meta Title"
            />
            <input
                type="text"
                name="metaDescription"
                value={formData.seo.metaDescription}
                onChange={handleSEOChange}
                placeholder="SEO Meta Description"
            />
            <input
                type="text"
                name="focusKeyword"
                value={formData.seo.focusKeyword}
                onChange={handleSEOChange}
                placeholder="SEO Focus Keyword"
            />
            <label>
                <input
                    type="checkbox"
                    name="isFeature"
                    checked={formData.isFeature}
                    onChange={handleChange}
                />
                Featured Post
            </label>
            <button type="submit">{blog ? 'Update' : 'Create'}</button>
        </form>
    );
}

export default BlogForm;