import React, { useState, useEffect } from 'react';
import axios from 'axios';

function News() {
  const [news, setNews] = useState('');
  const [link, setLink] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!news|| !link) {
      alert("Please fill in all the fields");
      return;
    }

    if (news.length < 5 || link.length > 50) {
      alert("Title should be between 5 and 50 characters");
      return;
    }
    try {
      // Call submitNews function to post data to MongoDB
      await submitNews(news, link);
      // Clear form inputs
      setNews('');
      setLink('');
    } catch (error) {
      console.error('Error saving news: ', error);
    }
  };

  const submitNews = async (news, link) => {
    try {
      const response = await axios
        .post('news/save', { news, link });
      alert('News saved successfully');
    } catch (error) {
      console.error('Error saving news: ', error);
    }
  };

  
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '50px auto',
        border: '2px',
      }}
    >
      <label style={{ marginBottom: '10px' }}>
        News:
        <input
          type="text"
          value={news}
          onChange={(event) => setNews(event.target.value)}
          style={{ marginLeft: '10px', width: '300px', borderRadius: '10px', padding: '5px', marginLeft:'10px' }}
        />
      </label>

      <label style={{ marginBottom: '7px' }}>
        Link :
        <input
          type="text"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          style={{
            marginLeft: '10px',
            width: '300px',
            borderRadius: '10px',
            padding: '5px',
            marginTop: '5px',
            marginLeft:'20px'
          }}
        />
      </label>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'center', marginLeft:"30px"}}>
        Submit
      </button>
    </form>
  );
}

export default News;