import React, { useReducer, useState } from 'react';
import SelectionPageHead from './SelectionPageHead';
import SelectedProblemList from './SelectedProblemList';

const pickedreducer = (state, action) => {
  const [unsolvedProblems, solvedProblems] = state;
  switch (action.type) {
    case 'unsolved': {
      return [
        unsolvedProblems.filter(problem => !problem.solve),
        solvedProblems
      ];
    }
    case 'solved': {
      return [
        unsolvedProblems,
        solvedProblems.filter(problem => problem.solve)
      ];
    }
    default: {
      return state;
    }
  }
};

function SelectionPage() {
  //추후 ContextAPI 도입
  const [selectedProblems, setSelectedProblems] = useState(testCode);
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
      dispatch({ type: 'unsolved' });
    }

    chageButton(true);
  };

  const pickSolvedProblems = () => {
    if (solvedProblems[0] === undefined) {
      solvedProblems.pop();
      solvedProblems.push(...testCode);
      dispatch({ type: 'solved' });
    }

    chageButton(false);
  };

  if (clickedButton == null) {
    return (
      <>
        <SelectionPageHead
          pickSolvedProblems={pickSolvedProblems}
          pickUnsolvedProblems={pickUnsolvedProblems}
        />
        {clickedButton == null && <div>버튼을 눌러주세요</div>}
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
        <SelectedProblemList selectedProblems={unsolvedProblems} />
      ) : (
        <SelectedProblemList selectedProblems={solvedProblems} />
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
