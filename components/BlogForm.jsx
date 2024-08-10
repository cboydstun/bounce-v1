import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './BlogForm.css';

function BlogForm({ blog, onCreate, onUpdate }) {
    const [formData, setFormData] = useState({
        title: '',
        introduction: '',
        body: '',
        conclusion: '',
        excerpt: '',
        featuredImage: '',
        categories: '',
        tags: '',
        status: 'draft',
        seo: { metaTitle: '', metaDescription: '', focusKeyword: '' },
        isFeature: false
    });
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);


    useEffect(() => {
        if (blog) {
            setFormData({
                ...blog,
                categories: blog.categories?.join(', ') || '',
                tags: blog.tags?.join(', ') || '',
                seo: blog.seo ? {
                    metaTitle: blog.seo.metaTitle || '',
                    metaDescription: blog.seo.metaDescription || '',
                    focusKeyword: blog.seo.focusKeyword || ''
                } : { metaTitle: '', metaDescription: '', focusKeyword: '' },
                isFeature: blog.isFeature || false
            });
            // Convert existing image data to a format compatible with our state
            setImages(blog.images?.map(img => ({
                name: img.filename,
                preview: `${import.meta.env.VITE_SERVER_URL}/uploads/${img.filename}`,
                existing: true
            })) || []);
        }
    }, [blog]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleContentChange = (content, editor) => {
        const name = editor.container.dataset.name;
        setFormData(prevData => ({
            ...prevData,
            [name]: content
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

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => {
            const originalName = file.name;
            const extension = originalName.split('.').pop();
            const nameWithoutExtension = originalName.split('.').slice(0, -1).join('.');
            const newFileName = `${nameWithoutExtension}-san-antonio-bounce-house-rentals-satxbounce.${extension}`;

            return {
                name: newFileName,
                preview: URL.createObjectURL(file),
                file: new File([file], newFileName, { type: file.type })
            };
        });
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitFormData = new FormData();

        // Append all non-file data as a single JSON string
        const jsonData = {
            ...formData,
            categories: formData.categories.split(',').map(item => item.trim()).filter(Boolean),
            tags: formData.tags.split(',').map(item => item.trim()).filter(Boolean),
        };
        submitFormData.append('blogData', JSON.stringify(jsonData));

        // Append each image file separately
        images.forEach((image, index) => {
            if (image.file) {
                // Add index to filename to prevent conflicts
                const fileName = `${index + 1}-${image.name}`;
                submitFormData.append('images', image.file, fileName);
            } else if (image.existing) {
                submitFormData.append('existingImages', JSON.stringify(image));
            }
        });

        console.log('Submitting form data:', jsonData);
        console.log('Files being uploaded:', images);

        if (blog) {
            onUpdate(blog.slug, submitFormData);
        } else {
            onCreate(submitFormData);
        }

        // Reset form after submission
        setFormData({
            title: '',
            introduction: '',
            body: '',
            conclusion: '',
            excerpt: '',
            featuredImage: '',
            categories: '',
            tags: '',
            status: 'draft',
            seo: { metaTitle: '', metaDescription: '', focusKeyword: '' },
            isFeature: false
        });
        setImages([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
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
            <ReactQuill
                theme="snow"
                value={formData.introduction}
                onChange={(content) => handleContentChange(content, { container: { dataset: { name: 'introduction' } } })}
                modules={modules}
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']}
                placeholder="Write your introduction here..."
            />
            <br />
            <ReactQuill
                theme="snow"
                value={formData.body}
                onChange={(content) => handleContentChange(content, { container: { dataset: { name: 'body' } } })}
                modules={modules}
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']}
                placeholder="Write your main content here..."
            />
            <br />
            <ReactQuill
                theme="snow"
                value={formData.conclusion}
                onChange={(content) => handleContentChange(content, { container: { dataset: { name: 'conclusion' } } })}
                modules={modules}
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']}
                placeholder="Write your conclusion here..."
            />
            <br />
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
                type="file"
                name="images"
                onChange={handleImageUpload}
                multiple
                ref={fileInputRef}
            />
            <div className="image-preview-container">
                {images.map((image, index) => (
                    <div key={index} className="image-preview-item">
                        <img
                            src={image.preview}
                            alt={image.name}
                            className="image-preview"
                            crossOrigin="anonymous"
                        />
                        <div className="image-preview-details">
                            <span>{image.name}</span>
                            <button type="button" onClick={() => {
                                setImages(images.filter((_, i) => i !== index));
                            }}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
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