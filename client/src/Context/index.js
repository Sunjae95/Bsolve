import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { API_ENDPOINT } from '../utils/config';
import { LOGIN, LOGOUT } from './actionType';

const initailState = {
  isLogged: !!localStorage.getItem('token'),
  problems: null
};

const isLoggedContext = React.createContext(initailState);

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLogged: true, problems: action.problems };
    case LOGOUT:
      return { isLogged: false };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [userInfo, dispatch] = useReducer(reducer, initailState);
  const token = localStorage.getItem('token');

  useEffect(async () => {
    const url = `${API_ENDPOINT}/login/checkLogin`;
    try {
      const infos = await axios({
        url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { token },
        withCredentials: true
      });

      dispatch({ type: LOGIN });
    } catch (e) {}
  }, []);

  const value = { userInfo, dispatch };
  return (
    <isLoggedContext.Provider value={value}>
      {children}
    </isLoggedContext.Provider>
  );
};

export { isLoggedContext, Provider };
