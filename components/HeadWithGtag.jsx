import React from 'react';

const HeadWithGtag = () => {
  const gtagScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}');
  `;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`}></script>
      <script dangerouslySetInnerHTML={{ __html: gtagScript }}></script>
    </>
  );
};

export default HeadWithGtag;