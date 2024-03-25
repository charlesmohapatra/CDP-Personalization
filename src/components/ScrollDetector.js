import React, { useEffect } from 'react';

const ScrollDetector = () => {
  useEffect(() => {
    const handleScroll = () => {
      console.log('User scrolled the page!');
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Your website content goes here */}
    </div>
  );
};

export default ScrollDetector;
