import axios, { AxiosResponse } from 'axios';
import log from 'loglevel';
import * as ApiModel from '../model';
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
  }
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
  }
);

const axiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export async function getCoins(): Promise<ApiModel.Coin[]> {
  try {
    const coinsResponse: AxiosResponse<ApiModel.Coin[]> = await axiosInstance.get<ApiModel.Coin[]>('/coins/list');
    return coinsResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function getMarkets(options: ApiModel.MarketOptions): Promise<ApiModel.CoinMarket[]> {
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

    const coinMarketsResponse: AxiosResponse<ApiModel.CoinMarket[]> = await axiosInstance.get<ApiModel.CoinMarket[]>('/coins/markets', {
      params,
    });
    return coinMarketsResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function getCoinDetails(id: string, options: ApiModel.CoinOptions): Promise<ApiModel.CoinDetails> {
  try {
    const { location, community_data, developer_data, market_data, tickers, sparkline } = options;

    let params: any = {
      location,
      community_data,
      developer_data,
      market_data,
      tickers,
      sparkline,
    };

    params = utils.removeUndefinedValues(params);

    const coinDetailsResponse: AxiosResponse<ApiModel.CoinDetails> = await axiosInstance.get<ApiModel.CoinDetails>(`/coins/${id}`, {
      params,
    });
    return coinDetailsResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function getCoinMarketChart(id: string, options: ApiModel.CoinMarketChartOptions): Promise<ApiModel.CoinMarket> {
  try {
    let params: any = {
      ...options,
    };

    params = utils.removeUndefinedValues(params);

    const coinDetailsResponse: AxiosResponse<ApiModel.CoinMarket> = await axiosInstance.get<ApiModel.CoinMarket>(
      `/coins/${id}/market_chart`,
      {
        params,
      }
    );
    return coinDetailsResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function getCoinMarketChartRange(id: string, options: ApiModel.CoinMarketChartRangeOptions): Promise<ApiModel.CoinMarketChart> {
  try {
    let params: any = {
      ...options,
    };

    params = utils.removeUndefinedValues(params);

    const coinDetailsResponse: AxiosResponse<ApiModel.CoinMarketChart> = await axiosInstance.get<ApiModel.CoinMarketChart>(
      `/coins/${id}/market_chart/range`,
      {
        params,
      }
    );
    return coinDetailsResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function getCoinHistory(id: string, options: ApiModel.CoinHistoryOptions): Promise<ApiModel.CoinHistory> {
  try {
    let params: any = {
      ...options,
    };

    params = utils.removeUndefinedValues(params);

    const coinDetailsResponse: AxiosResponse<ApiModel.CoinHistory> = await axiosInstance.get<ApiModel.CoinHistory>(`/coins/${id}/history`, {
      params,
    });
    return coinDetailsResponse.data;
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

export async function getPrices(coinIds: string | string[], currencyIds: string | string[]): Promise<ApiModel.Prices> {
  try {
    const ids: string = Array.isArray(coinIds) ? coinIds.join(',') : coinIds;
    const vs_currencies: string = Array.isArray(currencyIds) ? currencyIds.join(',') : currencyIds;
    const params = { ids, vs_currencies };
    const currenciesResponse: AxiosResponse<ApiModel.Prices> = await axiosInstance.get<ApiModel.Prices>('/simple/price', { params });
    return currenciesResponse.data;
  } catch (err) {
    throw err;
  }
}
