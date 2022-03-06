import React from 'react';
import Header from '../Header';
import log from 'loglevel';
import { Outlet } from 'react-router-dom';

log.setLevel('debug', true);

const Dashboard: React.FunctionComponent = () => {
  return (
    <div className='h-full'>
      <Header />
      <Outlet />
    </div>
  );
};
export default Dashboard;
