import React from 'react';
import Header from '../Header';
import log from 'loglevel';
import { Router } from '@reach/router';
import Home from '../../pages/Home';
import Index from '../../pages/ViewDetails';

log.setLevel('debug', true);


const Dashboard: React.FunctionComponent = (props) => {
  return (
    <div className='h-full'>
      <Header />
      <Router>
        <Home path="/"/>
        <Index path='crypto/:cryptoId' />
      </Router>
    </div>
  );
};
export default Dashboard;
