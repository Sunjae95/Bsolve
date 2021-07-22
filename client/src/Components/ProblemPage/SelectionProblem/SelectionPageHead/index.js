import React from 'react';
import PropTypes from 'prop-types';
import './SelectionPageHead.css';

function SelectionPageHead({ pickSolvedProblems, pickUnsolvedProblems }) {
  return (
    <div className="SelectionPageHeadContainer">
      <button
        className="profile-modify button-style"
        onClick={pickUnsolvedProblems}
      >
        풀지 못한 문제
      </button>
      <button
        className="profile-modify button-style"
        onClick={pickSolvedProblems}
      >
        완료한 문제
      </button>
    </div>
  );
}

SelectionPageHead.prototype = {
  pickSolvedProblems: PropTypes.func,
  pickUnsolvedProblems: PropTypes.func
};

export default SelectionPageHead;
