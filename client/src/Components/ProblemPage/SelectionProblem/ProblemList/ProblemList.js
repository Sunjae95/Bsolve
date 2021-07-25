import React, { useState } from 'react';
import PropTypes from 'prop-types';

function MoveButton({ problem, moveProblem, setIsLodding }) {
  return (
    <div>
      <button onClick={() => moveProblem(problem, setIsLodding)}>옮기기</button>
    </div>
  );
}

function DeleteButton({ no, removeProblem }) {
  return (
    <div>
      <button onClick={() => removeProblem(no)}>삭제</button>
    </div>
  );
}

function Problem({ problem, removeProblem, moveProblem }) {
  const [isLodding, setIsLodding] = useState(false);

  if (isLodding) return <div>로딩중..</div>;

  return (
    <div>
      <div>
        {problem.no}
        {problem.grade}
        {problem.title}
      </div>
      <MoveButton
        problem={problem}
        setIsLodding={setIsLodding}
        moveProblem={moveProblem}
      />
      <DeleteButton no={problem.no} removeProblem={removeProblem} />
    </div>
  );
}

function ProblemList({ problems, removeProblem, moveProblem }) {
  return (
    <div className="SelectProblemListContainer">
      {problems &&
        problems.map((problem, index) => {
          return (
            <Problem
              key={index}
              problem={problem}
              removeProblem={removeProblem}
              moveProblem={moveProblem}
            />
          );
        })}
    </div>
  );
}

ProblemList.propTypes = {
  problems: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.oneOf([null]).isRequired
  ]),
  removeProblem: PropTypes.func,
  moveProblem: PropTypes.func
};

Problem.propTypes = {
  problem: PropTypes.object,
  removeProblem: PropTypes.func,
  moveProblem: PropTypes.func
};

MoveButton.propTypes = {
  problem: PropTypes.object,
  moveProblem: PropTypes.func,
  setIsLodding: PropTypes.func
};

export default ProblemList;
