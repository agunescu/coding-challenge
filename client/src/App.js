import React from 'react';
import logo from './logo.svg';
import './App.css';
import Reports from './components/reports/reports';

function App() {
  return (
    <div className="App">
      <h1 className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </h1>
      <Reports />
    </div>
  );
}

export default App;
