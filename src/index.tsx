import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UpdateNotification from './components/UpdateNotification';

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <UpdateNotification />
    </React.Fragment>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
