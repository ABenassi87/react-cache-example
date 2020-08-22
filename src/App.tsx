import React from 'react';
import './assets/main.css';
import Dashboard from './components/Dashboard';

const App: React.FunctionComponent = () => {
  return (
    <div className='App h-screen'>
      <Dashboard />
    </div>
  );
};

export default App;
