import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { CoinDetails, CoinMarketChart, MarketData } from '../../model';
import * as utils from '../../utils';
import ChangesIndicator, { Indicator } from './ChangesIndicator';
import moment from 'moment';
import Historical from './Historical';

interface Props extends RouteComponentProps {
  cryptoId?: string;
}

type ViewDetailsTab = 'description' | 'historical';

const ViewDetails: React.FunctionComponent<Props> = (props) => {
  const { cryptoId } = props;
  const [coin, setCoin] = useState<CoinDetails>();
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [coinMarketChart, setCoinMarketChart] = useState<CoinMarketChart>();
  const [activeTab, setActiveTab] = useState<ViewDetailsTab>('description');
  const [loading, setLoading] = useState<boolean>(false);
  const [responseTime, setResponseTime] = useState<number>(-1);
  const refreshData = async () => {
    setLoading(true);
    const startTime = Date.now();
    setResponseTime(0);
    try {
      if (cryptoId) {
        const coinDetails: CoinDetails = await utils.fetchCoinDetails(cryptoId);
        setCoin(coinDetails);
        setIndicators(getIndicators(coinDetails?.market_data));
        const to = moment().unix();
        const from = moment().add(-1, 'year').unix();
        const coinMarketChart = await utils.fetchCoinMarketChartRange(cryptoId, from, to);
        setCoinMarketChart(coinMarketChart);
        console.log('coin details', coinDetails);
        console.log('coin Markets', coinMarketChart);
      }
    } catch (error) {
      console.error('Error', error);
    }

    setResponseTime(Date.now() - startTime);
    setLoading(false);
  };
  useEffect(() => {
    refreshData();
  }, []);

  const getIndicators = (marketData?: MarketData): Indicator[] => {
    const indicators: Indicator[] = [];
    if (!!marketData) {
      indicators.push({ label: '1 hour', value: marketData.price_change_percentage_1h_in_currency.usd });
      indicators.push({ label: '24 hours', value: marketData.price_change_percentage_24h_in_currency.usd });
      indicators.push({ label: '7 days', value: marketData.price_change_percentage_7d_in_currency.usd });
      indicators.push({ label: '14 days', value: marketData.price_change_percentage_14d_in_currency.usd });
      indicators.push({ label: '30 days', value: marketData.price_change_percentage_30d_in_currency.usd });
      indicators.push({ label: '1 year', value: marketData.price_change_percentage_1y_in_currency.usd });
    }

    return indicators;
  };

  return !!coin ? (
    <React.Fragment>
      <ChangesIndicator indicators={indicators} />
      <section className='text-gray-700 body-font my-20'>
        <div className='container mx-auto py-4 px-8 bg-white shadow-lg rounded-lg'>
          <div className='flex justify-center md:justify-start -mt-16'>
            <img className='w-20 h-20 object-cover rounded-full border-2 border-indigo-500' alt={coin.name} src={coin.image.small} />
          </div>

          <h2 className='text-gray-800 text-2xl mt-2 md:mt-0 md:text-3xl font-semibold'>
            {coin.name} <small>{coin?.symbol}</small>
            <span className='float-right'>
              {new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(coin?.market_data?.current_price.usd ?? 0)}
            </span>
          </h2>
          <div className='bg-white'>
            <nav className='flex flex-col sm:flex-row'>
              <button
                className='text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500'
                onClick={() => setActiveTab('description')}>
                Description
              </button>
              <button
                className='text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none'
                onClick={() => setActiveTab('historical')}>
                Historical Data
              </button>
            </nav>
          </div>

          {!!coin?.description?.en && activeTab === 'description' && (
            <p className='mt-2 text-gray-600' dangerouslySetInnerHTML={{ __html: coin.description.en }} />
          )}
          {!!coinMarketChart && activeTab === 'historical' && <Historical data={coinMarketChart?.prices} />}
        </div>
      </section>
    </React.Fragment>
  ) : (
    <div />
  );
};

export default ViewDetails;
