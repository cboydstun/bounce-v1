import React, { useState, useEffect } from "react";
import fetch from "cross-fetch";

export function Page() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://paparaz.me/api/v1/blogs");
                if (response && !response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogs([]);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            {blogs && blogs.map((blog) => (
                <div key={blog._id}>
                    <a href={`/blogs/${blog._id}`}>{blog.title}</a>
                </div>
            ))}
        </div>
    );
}