import React from 'react';
import PropTypes from 'prop-types';

function ModifyButton({ problem, changeProblem }) {
  return (
    <div>
      <button onClick={() => changeProblem(problem)}>옮기기</button>
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

function SelectedProblem({ problem, removeProblem, changeProblem }) {
  return (
    <div>
      <div>
        {problem.no}
        {problem.grade}
        {problem.title}
      </div>
      <ModifyButton problem={problem} changeProblem={changeProblem} />
      <DeleteButton no={problem.no} removeProblem={removeProblem} />
    </div>
  );
}

function SelectedProblemList({
  selectedProblems: problems,
  removeProblem,
  changeProblem
}) {
  return (
    <div className="SelectProblemListContainer">
      {problems &&
        problems.map((problem, index) => {
          return (
            <SelectedProblem
              key={index}
              problem={problem}
              removeProblem={removeProblem}
              changeProblem={changeProblem}
            />
          );
        })}
    </div>
  );
}

SelectedProblemList.propTypes = {
  selectedProblems: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.oneOf([null]).isRequired
  ]),
  removeProblem: PropTypes.func,
  changeProblem: PropTypes.func
};
export default SelectedProblemList;
