import React, { useReducer, useState } from 'react';
import SelectionPageHead from './SelectionPageHead';
import SelectedProblemList from './SelectedProblemList';

const pickedreducer = (state, action) => {
  const [unsolvedProblems, solvedProblems] = state;
  switch (action.type) {
    case 'getUnsolved': {
      return [
        unsolvedProblems.filter(problem => !problem.solve),
        solvedProblems
      ];
    }
    case 'getSolved': {
      return [
        unsolvedProblems,
        solvedProblems.filter(problem => problem.solve)
      ];
    }
    case 'deleteUnsolved': {
      return [
        unsolvedProblems.filter(problem => problem.no !== action.no),
        solvedProblems
      ];
    }
    case 'deleteSolved': {
      return [
        unsolvedProblems,
        solvedProblems.filter(problem => problem.no !== action.no)
      ];
    }
    case 'changeUnsolved': {
      return [
        unsolvedProblems.filter(problem => problem.no !== action.problem.no),
        // [...solvedProblems, action.problem]
        solvedProblems.concat(action.problem)
      ];
    }
    case 'changeSolved': {
      return [
        // [...unsolvedProblems, action.problem],
        unsolvedProblems.concat(action.problem),
        solvedProblems.filter(problem => problem.no !== action.problem.no)
      ];
    }
    default: {
      return state;
    }
  }
};

function SelectionPage() {
  //추후 ContextAPI 도입
  const [problems, dispatch] = useReducer(pickedreducer, [
    [undefined],
    [undefined]
  ]);
  const [clickedButton, setClickedButton] = useState(null);
  const [unsolvedProblems, solvedProblems] = problems;

  const chageButton = value => {
    setClickedButton(value);
  };

  const pickUnsolvedProblems = () => {
    if (unsolvedProblems[0] === undefined) {
      unsolvedProblems.pop();
      unsolvedProblems.push(...testCode);
      dispatch({ type: 'getUnsolved' });
    }

    chageButton(true);
  };

  const pickSolvedProblems = () => {
    if (solvedProblems[0] === undefined) {
      solvedProblems.pop();
      solvedProblems.push(...testCode);
      dispatch({ type: 'getSolved' });
    }

    chageButton(false);
  };

  const removeProblem = no => {
    if (clickedButton) {
      dispatch({ type: 'deleteUnsolved', no });
      return;
    }

    dispatch({ type: 'deleteSolved', no });
  };

  //만약에 풀지못한문제와 완료한 문제를 한번씩 렌더링을 안하면 change는 넘어가지만 오류남
  //이 부분은 백엔드 연동하면서 고민해볼것..!
  const changeProblem = problem => {
    problem.solve = !problem.solve;
    if (clickedButton) {
      dispatch({ type: 'changeUnsolved', problem });
      return;
    }

    dispatch({ type: 'changeSolved', problem });
  };

  if (clickedButton == null) {
    return (
      <>
        <SelectionPageHead
          pickSolvedProblems={pickSolvedProblems}
          pickUnsolvedProblems={pickUnsolvedProblems}
        />
        <div>버튼을 눌러주세요</div>
      </>
    );
  }

  return (
    <>
      <SelectionPageHead
        pickSolvedProblems={pickSolvedProblems}
        pickUnsolvedProblems={pickUnsolvedProblems}
      />
      {clickedButton ? (
        <SelectedProblemList
          selectedProblems={unsolvedProblems}
          removeProblem={removeProblem}
          changeProblem={changeProblem}
        />
      ) : (
        <SelectedProblemList
          selectedProblems={solvedProblems}
          removeProblem={removeProblem}
          changeProblem={changeProblem}
        />
      )}
    </>
  );
}

export default SelectionPage;

const testCode = [
  { no: 1, grade: 'gold', title: 'let', solve: true },
  { no: 2, grade: 'silver', title: 'is', solve: false },
  { no: 3, grade: 'gold', title: 'go', solve: false },
  { no: 4, grade: 'silver', title: 'toy', solve: true },
  { no: 5, grade: 'diamond', title: 'project', solve: true }
];
