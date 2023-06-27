import React, { useState, useEffect } from 'react';

const ImageSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  return (
    <img src={images[currentIndex]} alt="Advertisements" style={{ width: '275px', height: '275px', borderRadius:"10px", display:"block",margin:"5px auto",  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'  }} />
  );
};

export default ImageSlideshow;
