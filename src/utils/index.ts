import { CoinDetails, CoinHistory, CoinMarket, CoinMarketChart, MapOf } from '../model';
import * as api from '../api';

export function getMapOf<T>(array: T[], key: keyof T): MapOf<T> {
  return array.reduce((map: MapOf<T>, element: T) => {
    const keyValue: any = element[key];
    map[keyValue] = element;
    return map;
  }, {});
}

export function getArrayOf<T>(map: MapOf<T>): T[] {
  return Object.values(map);
}

export function removeUndefinedValues(obj: any): any {
  return Object.keys(obj).reduce((newObj: any, key: string) => {
    if (!!obj[key]) {
      newObj[key] = obj[key];
    }

    return newObj;
  }, {});
}

export const fetchMarketData = async () => {
  try {
    console.log('fetching Market Data');
    console.time('fetching market data');
    const markets: CoinMarket[] = await api.getMarkets({
      vs_currency: 'usd',
      per_page: 500,
      price_change_percentage: ['1h', '24h', '7d', '30d'],
    });

    console.log('fetching Market Data End');
    console.timeEnd('fetching market data');
    return markets;
  } catch (error) {
    console.error('fetching Market Data Error');
    console.timeEnd('fetching market data');
    throw error;
  }
};

export const fetchCoinDetails = async (coinId: string) => {
  try {
    console.log('fetching Coin Details');
    console.time('fetching coin details');
    const coinDetails: CoinDetails = await api.getCoinDetails(coinId, {
      location: false,
    });

    console.log('fetching Coin Details');
    console.timeEnd('fetching coin details');
    return coinDetails;
  } catch (error) {
    console.error('fetching Coin Details');
    console.timeEnd('fetching coin details');
    throw error;
  }
};

export const fetchCoinHistory = async (coinId: string, date: string) => {
  try {
    console.log('fetchCoinHistory');
    console.time('fetchCoinHistory');
    const coinDetails: CoinHistory = await api.getCoinHistory(coinId, {
      date,
    });

    console.log('fetchCoinHistory');
    console.timeEnd('fetchCoinHistory');
    return coinDetails;
  } catch (error) {
    console.error('fetchCoinHistory');
    console.timeEnd('fetchCoinHistory');
    throw error;
  }
};

export const fetchCoinMarketChart = async (coinId: string) => {
  try {
    console.log('fetchCoinMarketChart');
    console.time('fetchCoinMarketChart');
    const coinMarket: CoinMarket = await api.getCoinMarketChart(coinId, {
      vs_currency: 'usd',
      days: 'max',
    });

    console.log('fetchCoinMarketChart');
    console.timeEnd('fetchCoinMarketChart');
    return coinMarket;
  } catch (error) {
    console.error('fetchCoinMarketChart');
    console.timeEnd('fetchCoinMarketChart');
    throw error;
  }
};

export const fetchCoinMarketChartRange = async (coinId: string, from: number, to: number) => {
  try {
    console.log('fetchCoinMarketChartRange');
    console.time('fetchCoinMarketChartRange');
    const coinDetails: CoinMarketChart = await api.getCoinMarketChartRange(coinId, {
      vs_currency: 'usd',
      from,
      to,
    });

    console.log('fetchCoinMarketChartRange');
    console.timeEnd('fetchCoinMarketChartRange');
    return coinDetails;
  } catch (error) {
    console.error('fetchCoinMarketChartRange');
    console.timeEnd('fetchCoinMarketChartRange');
    throw error;
  }
};
