import React, { useEffect, useState } from 'react';
import { API_ENDPOINT } from 'Utility/config';
import axios from 'axios';
import './login.css';

function LoginPage() {
  const [url, setURL] = useState(null);

  useEffect(async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/login`);

      setURL(response.data.url);
    } catch (e) {
      setURL(false);
    }
  }, []);

  const onClick = () => {
    location.href = url;
  };

  if (url == null) return <div>로딩중..</div>;
  if (!url) return <div>오류!!</div>;

  return (
    <div className="LoginContent">
      <h1>서비스를 이용하려면 로그인이 필요합니다.</h1>
      <div className="LoginButton" onClick={onClick}></div>
    </div>
  );
}

export default LoginPage;
