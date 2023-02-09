export { Page }

import React, { useEffect, useState } from "react";


function Page(props) {

  const [blog, setBlog] = useState({});

  useEffect(() => {
    fetch(`https://www.rockettestserver.xyz/api/v1/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data));
  }, [props]);

  return (
    <div className="blog">
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
    </div>
  );
}