import React from 'react';
import PropTypes from 'prop-types';

function SelectedProblem({ problem }) {
  return (
    <div>
      {problem.no}
      {problem.grade}
      {problem.title}
    </div>
  );
}

function SelectedProblemList({ selectedProblems: problems }) {
  return (
    <div className="SelectProblemListContainer">
      {problems &&
        problems.map((problem, index) => {
          return <SelectedProblem key={index} problem={problem} />;
        })}
    </div>
  );
}

SelectedProblemList.propTypes = {
  selectedProblems: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.oneOf([null]).isRequired
  ])
};
export default SelectedProblemList;
