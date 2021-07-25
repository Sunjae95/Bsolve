import React, { useState, useEffect, useContext } from 'react';
import SelectionPageHeader from './SelectionPageHeader/SelectionPageHeader';
import ProblemList from './ProblemList/ProblemList';
import { API_ENDPOINT } from 'Utility/config';
import { postOptions } from 'Utility/axiosOptions';
import { userContext } from 'UserContext/index';
import {
  GET_UNSOLVED_PROBLEM,
  GET_SOLVED_PROBLEM,
  CHANGE_TO_UNSOLVED_PROBLEM,
  CHANGE_TO_SOLVED_PROBLEM
} from 'UserContext/actionType';
import axios from 'axios';

function SelectionPage() {
  const { userInfo, dispatch } = useContext(userContext);
  const url = `${API_ENDPOINT}/problem`;
  const token = localStorage.getItem('token');

  useEffect(async () => {
    try {
      const problem = await axios.post(url, { token }, postOptions);
      const { unsolvedProblem, solvedProblem } = problem.data;

      dispatch({ type: GET_UNSOLVED_PROBLEM, unsolvedProblem });
      dispatch({ type: GET_SOLVED_PROBLEM, solvedProblem });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [screenValue, setScreenValue] = useState(false);
  const { unsolvedProblem, solvedProblem } = userInfo;

  const changedScreen = value => {
    setScreenValue(value);
  };

  // const removeProblem = no => {
  //   if (screenValue) {
  //     dispatch({ type: 'deleteUnsolved', no });
  //     return;
  //   }

  //   dispatch({ type: 'deleteSolved', no });
  // };

  const moveProblem = async (problem, setIsLodding) => {
    const movedURL = `${url}/change`;
    const data = { token, problem };
    setIsLodding(true);

    try {
      const response = await axios.post(movedURL, data, postOptions);

      if (!response.data.success) return;

      setIsLodding(false);

      if (problem.solve === 0)
        return dispatch({ type: CHANGE_TO_SOLVED_PROBLEM, problem });

      dispatch({ type: CHANGE_TO_UNSOLVED_PROBLEM, problem });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <SelectionPageHeader changedScreen={changedScreen} />
      {screenValue ? (
        <ProblemList
          problems={solvedProblem}
          // removeProblem={removeProblem}
          moveProblem={moveProblem}
        />
      ) : (
        <ProblemList
          problems={unsolvedProblem}
          // removeProblem={removeProblem}
          moveProblem={moveProblem}
        />
      )}
    </>
  );
}

export default SelectionPage;
