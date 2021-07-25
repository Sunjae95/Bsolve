import React, { useState } from 'react';
import { API_ENDPOINT } from 'Utility/config';
import { postOptions } from 'Utility/axiosOptions';
import ProblemList from './ProblemList/ProblemList';
import PeekPageHeader from './PeekPageHeader';
import axios from 'axios';
function PeekPage() {
  const [problem, setProblem] = useState(null);

  const getProblems = async () => {
    const url = `${API_ENDPOINT}/problem/createProblem`;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(url, { token }, postOptions);

      setProblem(response.data);
    } catch (e) {}
  };

  return (
    <>
      <PeekPageHeader getProblems={getProblems} />
      <ProblemList problem={problem} />
    </>
  );
}

export default PeekPage;
