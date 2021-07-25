import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../CreationPage.css';

function Front() {
  return <div className="problemFront"></div>;
}

function Back({ no, grade, title }) {
  return (
    <div className="problemBack">
      <p>문제제목: {title}</p>
      <p>문제번호: {no}</p>
      <p>문제등급: {grade}</p>
    </div>
  );
}

function Problem({ no, grade, title }) {
  const [isFliped, setIsFliped] = useState(false);

  const onFilp = () => {
    setIsFliped(!isFliped);
  };

  return (
    <>
      <div
        className={'problemContainer' + (isFliped ? ' fliped' : '')}
        onClick={onFilp}
      >
        <Back no={no} grade={grade} title={title} />
        <Front />
      </div>
    </>
  );
}

function ProblemList({ problem }) {
  return (
    <div className="problemList">
      {problem &&
        [...problem].map((problem, index) => {
          return (
            <Problem
              key={index}
              no={problem.no}
              grade={problem.grade}
              title={problem.title}
            />
          );
        })}
    </div>
  );
}

Problem.propTypes = {
  no: PropTypes.string,
  grade: PropTypes.string,
  title: PropTypes.string
};

ProblemList.propTypes = {
  problem: PropTypes.array
};
export default ProblemList;
