import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/list');

      console.log('response', { response });
    } catch (error) {
      console.error('Error', error);
    }
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <button onClick={fetchData}>Get Data</button>
      </header>
    </div>
  );
}

export default App;
