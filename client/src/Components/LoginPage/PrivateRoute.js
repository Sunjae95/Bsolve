import React, { useContext, useEffect } from 'react';
import { API_ENDPOINT } from '../../utils/config';
import { Redirect, Route } from 'react-router';
import { isLoggedContext } from '../../Context';
import { LOGIN, LOGOUT } from '../../Context/actionType';
import axios from 'axios';

function PrivateRoute({ component: Component, ...rest }) {
  //Context API isLogged: 로그인상태 / dispatch: 로그인 상태바꿔주는 함수
  const { isLogged, dispatch } = useContext(isLoggedContext);

  useEffect(() => {
    //유저 현재 유저 불러오기
    axios({
      url: `${API_ENDPOINT}/login/checkLogin`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { user: localStorage.getItem('user') },
      withCredentials: true
    })
      .then(res => {
        dispatch({ type: LOGIN });
      })
      .catch(e => {
        dispatch({ type: LOGOUT });
      });
  }, []);

  //로그인 유무에 따른 조건부 렌더링
  return (
    <Route
      {...rest}
      render={props =>
        true ? <Component {...props} /> : <Redirect to="/login" />
        // isLogged.isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
