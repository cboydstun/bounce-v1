import React, { useState, useEffect } from 'react'

// import Blog from './Blog'

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('https://www.rockettestserver.xyz/api/v1/blogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
    }, []);

    console.log(blogs)

    return (
        <div>
            <h1>Blog Posts</h1>
            <div>
                {blogs.map(blog => (
                    <div key={blog._id}>
                        <div>
                            <a><h2>{blog.title}</h2></a>
                            <p>{blog.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Blog({ blog }) {
    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
        </div>
    )
}