import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinDetails, CoinMarketChart } from '../../model';
import * as utils from '../../utils';
import ChangesIndicator, { Indicator } from './ChangesIndicator';
import dayjs from 'dayjs';
import Historical from './Historical';
import Tabs, { Tab } from '../../components/Tabs';

type ViewDetailsTab = 'description' | 'historical';

const ViewDetails: React.FC = (props) => {
  const { cryptoId } = useParams();
  const [coin, setCoin] = useState<CoinDetails>();
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [coinMarketChart, setCoinMarketChart] = useState<CoinMarketChart>();
  const [activeTab, setActiveTab] = useState<string>('description');
  const [loading, setLoading] = useState<boolean>(false);
  const [responseTime, setResponseTime] = useState<number>(-1);

  const tabs: Tab[] = [
    {
      label: 'Description',
      value: 'description',
    },
    {
      label: 'Historical Data',
      value: 'historical',
    },
  ];

  const refreshData = useCallback(async () => {
    setLoading(true);
    const startTime = Date.now();
    setResponseTime(0);
    try {
      if (cryptoId) {
        const coinDetails: CoinDetails = await utils.fetchCoinDetails(cryptoId);
        setCoin(coinDetails);
        const to = dayjs().unix();
        const from = dayjs().add(-1, 'year').unix();
        const coinMarketChart = await utils.fetchCoinMarketChartRange(cryptoId, from, to);
        setCoinMarketChart(coinMarketChart);
        console.log('coin details', coinDetails);
        console.log('coin Markets', coinMarketChart);
      } else {
        setCoin(undefined);
        setCoinMarketChart(undefined);
      }
    } catch (error) {
      console.error('Error', error);
    }

    setResponseTime(Date.now() - startTime);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    setIndicators(getIndicators);
  }, [coin]);

  const getIndicators = useMemo<Indicator[]>((): Indicator[] => {
    const indicators: Indicator[] = [];
    if (!!coin?.market_data) {
      indicators.push({ label: '1 hour', value: coin.market_data.price_change_percentage_1h_in_currency.usd });
      indicators.push({ label: '24 hours', value: coin.market_data.price_change_percentage_24h_in_currency.usd });
      indicators.push({ label: '7 days', value: coin.market_data.price_change_percentage_7d_in_currency.usd });
      indicators.push({ label: '14 days', value: coin.market_data.price_change_percentage_14d_in_currency.usd });
      indicators.push({ label: '30 days', value: coin.market_data.price_change_percentage_30d_in_currency.usd });
      indicators.push({ label: '1 year', value: coin.market_data.price_change_percentage_1y_in_currency.usd });
    }

    return indicators;
  }, [
    coin?.market_data?.price_change_percentage_1h_in_currency.usd,
    coin?.market_data?.price_change_percentage_24h_in_currency.usd,
    coin?.market_data?.price_change_percentage_7d_in_currency.usd,
    coin?.market_data?.price_change_percentage_14d_in_currency.usd,
    coin?.market_data?.price_change_percentage_30d_in_currency.usd,
    coin?.market_data?.price_change_percentage_1y_in_currency.usd,
  ]);

  const onTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return !!coin ? (
    <section className='text-gray-700 body-font my-16'>
      <div className='container mx-auto py-4 px-8 bg-white shadow-lg rounded-lg'>
        <div className='flex justify-center md:justify-start -mt-16'>
          <img className='w-20 h-20 object-cover rounded-full border-2 border-indigo-500' alt={coin.name} src={coin.image.small} />
        </div>

        <h2 className='text-gray-800 text-2xl mt-2 md:mt-0 md:text-3xl font-semibold'>
          {coin.name} <small>{coin?.symbol}</small>
          {coin?.last_updated && (
            <small className='ml-2 text-sm'>({dayjs(new Date(coin.last_updated)).format('MM/DD/YYYY HH:mm:ss Z')})</small>
          )}
          <span className='float-right'>
            {new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(coin?.market_data?.current_price.usd ?? 0)}
          </span>
        </h2>
        <ChangesIndicator indicators={indicators} />
        <Tabs tabItems={tabs} onTabClick={onTabClick} activeTab={activeTab} />
        {!!coin?.description?.en && activeTab === 'description' && (
          <p className='mt-2 text-gray-600' dangerouslySetInnerHTML={{ __html: coin.description.en }} />
        )}
        {!!coinMarketChart && activeTab === 'historical' && <Historical data={coinMarketChart?.prices} />}
      </div>
    </section>
  ) : (
    <div />
  );
};

export default ViewDetails;
