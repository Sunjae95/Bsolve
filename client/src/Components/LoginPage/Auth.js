import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { API_ENDPOINT } from 'Utility/config';
import axios from 'axios';
import { isLoggedContext } from '../../Context';
import { LOGIN, LOGOUT, LOADING } from '../../Context/actionType';

function Auth() {
  //context API 도입중... 여기서부터 시작
  const { userInfo, dispatch } = useContext(isLoggedContext);
  const [isLodding, setIsLodding] = useState(true);

  useEffect(async () => {
    const authCode = { authCode: location.search.slice(6) };
    const url = `${API_ENDPOINT}/login/auth`;

    setIsLodding(false);

    try {
      const infos = await axios({
        url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(authCode),
        withCredentials: true
      });

      dispatch({ type: LOGIN });
      localStorage.setItem('token', infos.data.token);
    } catch (e) {
      console.log('에러내용', e);
      localStorage.clear();
    }
  }, []);
  if (isLodding) return <div>로그인중..</div>;
  if (userInfo.isLogged) return <Redirect to="/" />;
  return <div>로그인 실패</div>;
}

export default Auth;
