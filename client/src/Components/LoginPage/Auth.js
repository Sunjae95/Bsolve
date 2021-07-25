import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { API_ENDPOINT } from 'Utility/config';
import { postOptions } from 'Utility/axiosOptions';
import { userContext } from 'UserContext/index';
import { LOGIN } from 'UserContext/actionType';
import axios from 'axios';

function Auth() {
  const { userInfo, dispatch } = useContext(userContext);
  const [isLodding, setIsLodding] = useState(true);

  useEffect(async () => {
    const authCode = { authCode: location.search.slice(6) };
    const url = `${API_ENDPOINT}/login/auth`;

    setIsLodding(false);

    try {
      const infos = await axios.post(url, authCode, postOptions);

      localStorage.setItem('token', infos.data.token);
      dispatch({ type: LOGIN });
    } catch (e) {
      localStorage.clear();
      console.log('에러내용', e);
    }
  }, []);

  if (isLodding) return <div>로그인중..</div>;
  if (userInfo.isLogged) return <Redirect to="/" />;
  return <div>로그인 실패</div>;
}

export default Auth;
