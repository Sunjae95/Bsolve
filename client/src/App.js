import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import LoginPage from './Components/LoginPage/LoginPage';
import Auth from './Components/LoginPage/Auth';
import Mypage from './Components/MyPage/Mypage';
import ProblemPage from './Components/ProblemPage/ProblemPage';
import RankingPage from './Components/RankPage/RankingPage';
import HomePage from './Components/HomePage/HomePage';
import './App.css';
import PrivateRoute from './Components/LoginPage/PrivateRoute';

function App() {
  return (
    <div className="Main">
      <NavBar />
      <div className="MainPageContent">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/auth" component={Auth} />
          <PrivateRoute path="/mypage" component={Mypage} />
          <PrivateRoute path="/problem" component={ProblemPage} />
          <PrivateRoute path="/rank" component={RankingPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
