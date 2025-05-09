import React from 'react';
import Headers from './Headers';
import Footer from './Footer';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Headers />
      <main style={{ minHeight: '80vh' }}>
         <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'Ecommerce app - shop now',
  description: 'mern stack project',
  keywords: 'mern, react, node, mongodb',
  author: 'Abir Sheikh',
};

export default Layout; // Correct export
