import './HomePage.css';
import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie'

export default function HomePage() {
  const [data, setData] = useState(null); // Use null initially
  const [error, setError] = useState(null);
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);

  const loadData = async () => {
    try {
      const backend_url = `${process.env.BACKEND_URL}/users`;
      const res = await fetch(backend_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const contentType = res.headers.get("Content-Type");

      if (res.ok) {
        if (contentType.includes("application/json")) {
          const resJson = await res.json();
          setData(resJson);
        } else if (contentType.includes("text/html")) {
          const resText = await res.text();
          setData(resText);
        }
      } else {
        setError("Error fetching data.");
      }
    } catch (err) {
      setError("An error occurred.");
    }
  };

  const checkAuth = async () => {
    console.log('checkAuth')
    // [TODO] Authenication
    if (Cookies.get('user.logged_in')) {
      setUser({
        display_name: Cookies.get('user.name'),
        handle: Cookies.get('user.username')
      })
    }
  };

  React.useEffect(()=>{
    //prevents double call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadData();
    checkAuth();
  }, [])
  
  return (
    <article className="home-page">
      <div className="data-container">
        <h2>Fetched Data</h2>
        {error && <p>{error}</p>}
        {data ? (
          typeof data === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: data }} /> // Render HTML safely
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre> // Format JSON for readability
          )
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </article>
  );
}
