import React from 'react';

const HeadWithGtag = () => {
  const gtagScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}');
  `;

  const gtmScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${import.meta.env.VITE_GTM_ID}');
  `;

  return (
    <>
      {/* Google Tag Manager */}
      <script dangerouslySetInnerHTML={{ __html: gtmScript }}></script>

      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`}></script>
      <script dangerouslySetInnerHTML={{ __html: gtagScript }}></script>
    </>
  );
};

export default HeadWithGtag;
