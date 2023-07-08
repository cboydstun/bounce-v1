import React, { useEffect, useState } from "react";

export { Page };

function Page() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("https://paparaz.me/api/v1/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs.");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
        // Handle error state or display error message
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}
