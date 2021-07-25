import React from 'react';
import PropTypes from 'prop-types';
import './SelectionPageHeader.css';

function SelectionPageHeader({ changedScreen }) {
  return (
    <div className="SelectionPageHeadContainer">
      <button
        className="profile-modify button-style"
        onClick={() => changedScreen(false)}
      >
        풀지 못한 문제
      </button>
      <button
        className="profile-modify button-style"
        onClick={() => changedScreen(true)}
      >
        완료한 문제
      </button>
    </div>
  );
}

SelectionPageHeader.prototype = {
  changedScreen: PropTypes.func
};

export default SelectionPageHeader;
