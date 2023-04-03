import React, { useState, useEffect } from "react";
import fetch from "cross-fetch";

export function Page() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postId = window.location.pathname.split("/")[2];

    async function fetchData() {
      if (!postId) {
        setError("Blog post ID is not defined.");
        return;
      }

      try {
        const response = await fetch(`https://paparaz.me/api/v1/blogs/${postId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { title, author, content, date } = await response.json();
        setPost({ title, author, content, date });
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("An error occurred while fetching the blog post.");
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const { title, author, content, date } = post;

  return (
    <>
      <h1>{title}</h1>
      <h2>Author: {author}</h2>
      <p>{content}</p>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
    </>
  );
}
