import React, { useEffect, useState } from 'react';
import ImageSlideshow from './ImageSlideshow';
import './Ads.css'
import axios from 'axios';
import withAuth from '../../hoc/withAuth';

const Ads = () => {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) {
      alert("Authorization token missing");
      return;
    }
    axios.get('http://localhost:8000/advertisements', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setAds(response.data.existingAds);
    })
    .catch(error => {
      alert(error.message);
    });
  }, []);
  

  return (
    <div>
      <a href={ads.map(ad => ad.link)} target="_blank" rel="noopener noreferrer">
        <ImageSlideshow images={ads.map(ad => ad.image)} />
      </a>
    </div>
  );
};
export default withAuth(Ads)