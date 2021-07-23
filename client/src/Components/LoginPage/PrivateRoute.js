import React, { useContext, useEffect } from 'react';
import { API_ENDPOINT } from '../../utils/config';
import { Redirect, Route } from 'react-router';
import { isLoggedContext } from '../../Context';
import { LOGIN, LOGOUT } from '../../Context/actionType';
import axios from 'axios';

function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo, dispatch } = useContext(isLoggedContext);
  // useEffect(() => {

  // }, [userInfo.isLogged]);
  //로그인 유무에 따른 조건부 렌더링
  return (
    <Route
      {...rest}
      render={
        props =>
          userInfo.isLogged ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        // isLogged.isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
