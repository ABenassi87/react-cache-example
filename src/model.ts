/*
 *
 * */
export interface MapOf<T> {
  [key: string]: T;
}

export interface MapOfArray<T> extends MapOf<T[]> {}

export interface MenuItem {
  id?: string;
  label: string;
  link: string;
}

export type MarketOrderType =
  | 'gecko_desc'
  | 'gecko_asc'
  | 'market_cap_asc'
  | 'market_cap_desc'
  | 'volume_asc'
  | 'volume_desc'
  | 'id_asc'
  | 'id_desc';

export type PriceChangePercentage = '1h' | '24h' | '7d' | '14d' | '30d' | '200d' | 'y1';

export interface MarketOptions {
  vs_currency: string;
  ids?: string[];
  order?: MarketOrderType;
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: PriceChangePercentage[];
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
}

export interface CoinMarket extends Coin {
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage24h: number;
  circulating_supply: number;
  total_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: Roi;
  last_updated: string;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  price_change_percentage_200d_in_currency?: number;
  price_change_percentage_1y_in_currency?: number;
}

interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface Prices extends MapOf<MapOf<number>> {}
