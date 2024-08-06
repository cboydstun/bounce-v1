import React, { useState, useEffect } from 'react';
import './Blogs.css';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

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

    // Get current blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="blogs-container">
            <h1>Blog Posts</h1>
            <div className="blog-grid">
                {currentBlogs.map(blog => (
                    <div key={blog._id} className="blog-card">
                        <img src={blog.featuredImage} alt={blog.title} className="blog-image" />
                        <div className="blog-content">
                            <h2 className="blog-title">
                                <a href={`/blogs/${blog.slug}`} className="blog-link">{blog.title}</a>
                            </h2>
                            <p className="blog-excerpt">{blog.excerpt}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastBlog >= blogs.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Blogs;