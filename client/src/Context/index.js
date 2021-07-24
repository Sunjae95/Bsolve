import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { API_ENDPOINT } from '../utils/config';
import {
  LOGIN,
  LOGOUT,
  CHANGETOUNSOLVED,
  CHANGETOSOLVED,
  PROBLEMS,
  SOLVEDPROBLEM,
  UNSOLVEDPROBLEM
} from './actionType';

const initailState = {
  isLogged: !!localStorage.getItem('token'),
  unsolvedProblem: null,
  solvedProblem: null
};

const userContext = React.createContext(initailState);

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogged: true };
    case LOGOUT:
      return { ...state, isLogged: false };
    case PROBLEMS: {
      return { ...state, problems: action.problems };
    }
    case UNSOLVEDPROBLEM: {
      return { ...state, unsolvedProblem: action.unsolvedProblem };
    }
    case SOLVEDPROBLEM: {
      return { ...state, solvedProblem: action.solvedProblem };
    }
    case CHANGETOUNSOLVED: {
      const problemNo = action.problem.no;
      const arrLen = state.solvedProblem.filter(
        problem => problem.no !== problemNo
      );
      const solvedProblem = arrLen.length > 0 ? arrLen : null;

      if (state.unsolvedProblem == null) {
        unsolvedProblem.push();
        return {
          ...state,
          unsolvedProblem: [{ ...action.problem, solve: 0 }],
          solvedProblem
        };
      }

      return {
        ...state,
        unsolvedProblem: [
          ...state.unsolvedProblem,
          {
            ...action.problem,
            solve: 0
          }
        ],
        solvedProblem
      };
    }
    case CHANGETOSOLVED: {
      const problemNo = action.problem.no;
      const arrLen = state.unsolvedProblem.filter(
        problem => problem.no !== problemNo
      );
      const unsolvedProblem = arrLen.length > 0 ? arrLen : null;

      if (state.solvedProblem == null) {
        return {
          ...state,
          unsolvedProblem,
          solvedProblem: [{ ...action.problem, solve: 1 }]
        };
      }

      return {
        ...state,
        unsolvedProblem,
        solvedProblem: [
          ...state.solvedProblem,
          {
            ...action.problem,
            solve: 1
          }
        ]
      };
    }
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
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export { userContext, Provider };
