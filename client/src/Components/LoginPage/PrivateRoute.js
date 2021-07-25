import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from 'UserContext/index';

function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo } = useContext(userContext);

  return (
    <Route
      {...rest}
      render={props =>
        userInfo.isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
