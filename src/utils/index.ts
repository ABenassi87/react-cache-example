import { CoinMarket, MapOf } from '../model';
import * as api from '../api';

export function getMapOf<T>(array: T[], key: keyof T): MapOf<T> {
  return array.reduce((map: MapOf<T>, element: T) => {
    const keyValue: any = element[key];
    map[keyValue] = element;
    return map;
  }, {});
}

export function getArrayOf<T>(map: MapOf<T>, keyIds: string[]): T[] {
  return keyIds.map((keyId) => map[keyId]);
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
      per_page: 20,
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
