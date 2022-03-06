import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router-dom';
import { CoinMarket } from '../../model';
import * as utils from '../../utils';
import MarketTable from './MarketTable';

interface Props extends RouteProps {}

const Home: React.FunctionComponent<Props> = () => {
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
  );
};

export default Home;
