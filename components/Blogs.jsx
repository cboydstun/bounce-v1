import React, { useState, useEffect } from 'react'

import Blog from './Blog'


export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('https://www.rockettestserver.xyz/api/v1/blogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
    }, []);

    return (
        <div className='blog-container'>
            <h1>Blog Posts</h1>
            <div className='blogs'>
                {blogs.map(blog => (
                    <div className='blog' key={blog.id}>
                        <Blog blog={blog} />


                        </div>
                ))}
            </div>
        </div>
    )
}
