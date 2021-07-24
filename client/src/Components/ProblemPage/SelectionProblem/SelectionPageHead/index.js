import React from 'react';
import PropTypes from 'prop-types';
import './SelectionPageHead.css';

function SelectionPageHead({
  pickSolvedProblems,
  pickUnsolvedProblems,
  chageButton
}) {
  return (
    <div className="SelectionPageHeadContainer">
      <button
        className="profile-modify button-style"
        onClick={() => chageButton(false)}
      >
        풀지 못한 문제
      </button>
      <button
        className="profile-modify button-style"
        onClick={() => chageButton(true)}
      >
        완료한 문제
      </button>
    </div>
  );
}

SelectionPageHead.prototype = {
  pickSolvedProblems: PropTypes.func,
  pickUnsolvedProblems: PropTypes.func,
  chageButton: PropTypes.func
};

export default SelectionPageHead;
