import React from 'react';
import Header from '../Header/Header';
import log from 'loglevel';
import { Router } from '@reach/router';
import Home from '../../pages/Home';
import ViewDetails from '../../pages/ViewDetails/ViewDetails';

log.setLevel('debug', true);


const Dashboard: React.FunctionComponent = (props) => {
  return (
    <div className='DashboardContainer'>
      <Header />
      <Router>
        <Home path="/"/>
        <ViewDetails path='crypto/:cryptoId' />
      </Router>
    </div>
  );
};
export default Dashboard;
