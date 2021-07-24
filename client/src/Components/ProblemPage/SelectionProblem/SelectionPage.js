import React, { useContext, useEffect, useReducer, useState } from 'react';
import SelectionPageHead from './SelectionPageHead';
import SelectedProblemList from './SelectedProblemList';
import { userContext } from '../../../Context/index';
import { API_ENDPOINT } from 'Utility/config';
import axios from 'axios';
import {
  CHANGETOSOLVED,
  CHANGETOUNSOLVED,
  SOLVEDPROBLEM,
  UNSOLVEDPROBLEM
} from '../../../Context/actionType';

// const pickedreducer = (state, action) => {
//   const [unsolvedProblems, solvedProblems] = state;
//   switch (action.type) {
//     case 'getUnsolved': {
//       return [
//         unsolvedProblems.filter(problem => !problem.solve),
//         solvedProblems
//       ];
//     }
//     case 'getSolved': {
//       return [
//         unsolvedProblems,
//         solvedProblems.filter(problem => problem.solve)
//       ];
//     }
//     case 'deleteUnsolved': {
//       return [
//         unsolvedProblems.filter(problem => problem.no !== action.no),
//         solvedProblems
//       ];
//     }
//     case 'deleteSolved': {
//       return [
//         unsolvedProblems,
//         solvedProblems.filter(problem => problem.no !== action.no)
//       ];
//     }
//     case 'changeUnsolved': {
//       return [
//         unsolvedProblems.filter(problem => problem.no !== action.problem.no),
//         // [...solvedProblems, action.problem]
//         solvedProblems.concat(action.problem)
//       ];
//     }
//     case 'changeSolved': {
//       return [
//         // [...unsolvedProblems, action.problem],
//         unsolvedProblems.concat(action.problem),
//         solvedProblems.filter(problem => problem.no !== action.problem.no)
//       ];
//     }
//     default: {
//       return state;
//     }
//   }
// };

function SelectionPage() {
  //추후 ContextAPI 도입
  const { userInfo, dispatch } = useContext(userContext);
  const url = `${API_ENDPOINT}/problem`;
  const token = localStorage.getItem('token');
  //여기서 문제 있는거 같음
  useEffect(async () => {
    try {
      const problem = await axios({
        url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { token },
        withCredentials: true
      });
      const { unsolvedProblem, solvedProblem } = problem.data;

      dispatch({ type: UNSOLVEDPROBLEM, unsolvedProblem });
      dispatch({ type: SOLVEDPROBLEM, solvedProblem });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [clickedButton, setClickedButton] = useState(false);
  const { unsolvedProblem, solvedProblem } = userInfo;

  const chageButton = value => {
    setClickedButton(value);
  };

  // const pickUnsolvedProblems = () => {
  //   if (unsolvedProblems[0] === undefined) {
  //     unsolvedProblems.pop();
  //     unsolvedProblems.push(...testCode);
  //     dispatch({ type: 'getUnsolved' });
  //   }

  //   chageButton(true);
  // };

  // const pickSolvedProblems = () => {
  //   if (solvedProblems[0] === undefined) {
  //     solvedProblems.pop();
  //     solvedProblems.push(...testCode);
  //     dispatch({ type: 'getSolved' });
  //   }

  //   chageButton(false);
  // };

  // const removeProblem = no => {
  //   if (clickedButton) {
  //     dispatch({ type: 'deleteUnsolved', no });
  //     return;
  //   }

  //   dispatch({ type: 'deleteSolved', no });
  // };

  // //만약에 풀지못한문제와 완료한 문제를 한번씩 렌더링을 안하면 change는 넘어가지만 오류남
  // //이 부분은 백엔드 연동하면서 고민해볼것..!

  const changeProblem = async (problem, setIsLodding) => {
    const changedURL = `${url}/change`;
    setIsLodding(true);

    try {
      const response = await axios({
        url: changedURL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { token, problem },
        withCredentials: true
      });

      if (!response.data.success) return;

      setIsLodding(false);

      if (problem.solve === 0) {
        dispatch({ type: CHANGETOSOLVED, problem });
      } else {
        dispatch({ type: CHANGETOUNSOLVED, problem });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // if (clickedButton) {
  //   dispatch({ type: 'changeUnsolved', problem });
  //   return;
  // }

  // dispatch({ type: 'changeSolved', problem });

  return (
    <>
      <SelectionPageHead
        chageButton={chageButton}
        // pickSolvedProblems={pickSolvedProblems}
        // pickUnsolvedProblems={pickUnsolvedProblems}
      />
      {clickedButton ? (
        <SelectedProblemList
          selectedProblems={solvedProblem}
          // removeProblem={removeProblem}
          changeProblem={changeProblem}
        />
      ) : (
        <SelectedProblemList
          selectedProblems={unsolvedProblem}
          // removeProblem={removeProblem}
          changeProblem={changeProblem}
        />
      )}
    </>
  );
}

export default SelectionPage;
