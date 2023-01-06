import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

const App = () => {
  return (
    <div className='d-flex justify-content-center align-items-center wrapper'>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
