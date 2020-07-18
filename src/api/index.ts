import axios, { AxiosResponse } from 'axios';
import log from 'loglevel';
import { Coin, CoinMarket, MarketOptions, Prices } from '../model';
import * as utils from '../utils';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    log.debug('Starting Request', config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    log.debug('Response:', response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    log.error('Response Error:', error);
    return Promise.reject(error);
  },
);

const axiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export async function getCoins(): Promise<Coin[]> {
  try {
    const coinsResponse: AxiosResponse<Coin[]> = await axiosInstance.get<Coin[]>('/coins/list');
    return coinsResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function getMarkets(options: MarketOptions): Promise<CoinMarket[]> {
  try {
    const { vs_currency, ids, order, page, per_page, price_change_percentage, sparkline } = options;
    if (!vs_currency) {
      throw new Error('A Currency is required');
    }

    let coinIds = undefined;
    let priceChangePercentage = undefined;

    if (!!ids) {
      coinIds = ids.join(',');
    }
    if (!!price_change_percentage) {
      priceChangePercentage = price_change_percentage.join(',');
    }

    let params: any = {
      vs_currency,
      ids: coinIds,
      order,
      page,
      per_page,
      price_change_percentage: priceChangePercentage,
      sparkline,
    };

    params = utils.removeUndefinedValues(params);

    const coinMarketsResponse: AxiosResponse<CoinMarket[]> = await axiosInstance.get<CoinMarket[]>('/coins/markets', { params });
    return coinMarketsResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function getSupportedCurrencies(): Promise<string[]> {
  try {
    const currenciesResponse: AxiosResponse<string[]> = await axiosInstance.get<string[]>('/simple/supported_vs_currencies');
    return currenciesResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function getPrices(coinIds: string | string[], currencyIds: string | string[]): Promise<Prices> {
  try {
    const ids: string = Array.isArray(coinIds) ? coinIds.join(',') : coinIds;
    const vs_currencies: string = Array.isArray(currencyIds) ? currencyIds.join(',') : currencyIds;
    const params = { ids, vs_currencies };
    const currenciesResponse: AxiosResponse<Prices> = await axiosInstance.get<Prices>('/simple/price', { params });
    return currenciesResponse.data;
  } catch (err) {
    throw err;
  }
}
