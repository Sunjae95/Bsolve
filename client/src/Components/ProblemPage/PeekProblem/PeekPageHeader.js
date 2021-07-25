import React from 'react';
import Proptypes from 'prop-types';
function PeekPageHeader({ getProblems }) {
  return (
    <div className="problemPageHead">
      <button className="profile-modify button-style" onClick={getProblems}>
        뽑기 버튼
      </button>
    </div>
  );
}

PeekPageHeader.Proptypes = {
  getProblems: Proptypes.func
};
export default PeekPageHeader;
