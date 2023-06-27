import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./News.css";
import axios from 'axios'
import withAuth from "../../hoc/withAuth";

function News() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) {
      alert("Authorization token missing");
      return;
    }
    axios.get('http://localhost:8000/news', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setNews(response.data.existingNews);
      })
      .catch(error => {
        alert(error.message);
      });
  }, []);


  return (
    <div className="News">
      <div className="latestNews">{t('Latest News')}</div>
      <ul class="newsHeadline">
        {news.map((news, index) => (
          <li>
            <a href={news.link} target="_blank">{news.news}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default withAuth(News);
