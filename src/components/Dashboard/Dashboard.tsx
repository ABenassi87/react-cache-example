import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { CoinMarket } from '../../model';
import log from 'loglevel';
import MarketTable from './MarketTable/MarketTable';
import * as utils from '../../utils';

log.setLevel('debug', true);

const Dashboard: React.FunctionComponent = () => {
  const [markets, setMarkets] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseTime, setResponseTime] = useState<number>(-1);
  const refreshData = async () => {
    setLoading(true);
    const startTime = Date.now();
    setResponseTime(0);
    try {
      const marketsResults = await utils.fetchMarketData();
      setMarkets(marketsResults);
    } catch (error) {
      console.error('Error', error);
    }

    setResponseTime(Date.now() - startTime);
    setLoading(false);
  };
  useEffect(() => {
    refreshData();
  }, []);
  return (
    <div className='DashboardContainer'>
      <Header />
      <React.Fragment>
        <div className='mx-auto px-4 mt-2'>
          <div className='flex flex-wrap'>
            <button className='btn' disabled={loading} onClick={refreshData}>
              Refresh Data
            </button>
          </div>
        </div>
        {!loading && (
          <div className='mx-auto px-4 mt-2'>
            <div className='flex flex-wrap'>
              <MarketTable coins={markets} responseTime={responseTime} />
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};
export default Dashboard;
