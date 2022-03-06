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

export interface CoinOptions {
  location?: boolean;
  tickers?: boolean;
  market_data?: boolean;
  community_data?: boolean;
  developer_data?: boolean;
  sparkline?: boolean;
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

export interface CoinDetails extends Coin {
  asset_platform_id?: any;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  localization?: Localization;
  description?: Localization;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data?: MarketData;
  community_data?: CommunityData;
  developer_data?: DeveloperData;
  public_interest_stats?: PublicInterestStats;
  status_updates: any[];
  last_updated: string;
  tickers?: Ticker[];
}

interface Ticker {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: ConvertedLast;
  converted_volume: ConvertedLast;
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url?: string;
  coin_id: string;
  target_coin_id?: string;
}

interface ConvertedLast extends MapOf<number> {}

interface Market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}

interface PublicInterestStats {
  alexa_rank: number;
  bing_matches?: any;
}

interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: CodeAdditionsDeletions4weeks;
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series: number[];
}

interface CodeAdditionsDeletions4weeks {
  additions: number;
  deletions: number;
}

interface CommunityData {
  facebook_likes?: any;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count?: any;
}

export interface MarketData {
  current_price: CurrentPrice;
  roi?: Roi;
  ath: CurrentPrice;
  ath_change_percentage: CurrentPrice;
  ath_date: AthDate;
  atl: CurrentPrice;
  atl_change_percentage: CurrentPrice;
  atl_date: AthDate;
  market_cap: CurrentPrice;
  market_cap_rank: number;
  total_volume: CurrentPrice;
  high_24h: CurrentPrice;
  low_24h: CurrentPrice;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: CurrentPrice;
  price_change_percentage_1h_in_currency: CurrentPrice;
  price_change_percentage_24h_in_currency: CurrentPrice;
  price_change_percentage_7d_in_currency: CurrentPrice;
  price_change_percentage_14d_in_currency: CurrentPrice;
  price_change_percentage_30d_in_currency: CurrentPrice;
  price_change_percentage_60d_in_currency: CurrentPrice;
  price_change_percentage_200d_in_currency: CurrentPrice;
  price_change_percentage_1y_in_currency: CurrentPrice;
  market_cap_change_24h_in_currency: CurrentPrice;
  market_cap_change_percentage_24h_in_currency: CurrentPrice;
  total_supply: number;
  circulating_supply: number;
  last_updated: string;
}

interface AthDate extends MapOf<string> {}

interface CurrentPrice extends MapOf<number> {}

interface Image {
  thumb: string;
  small: string;
  large: string;
}

interface Links {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier?: any;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: ReposUrl;
}

interface ReposUrl {
  github: string[];
  bitbucket: any[];
}

interface Localization extends MapOf<string> {}

export interface CoinHistoryOptions {
  date: string;
  location?: boolean;
}

export interface CoinHistory {
  date?: string;
  location?: boolean;
}

export interface CoinMarketChartOptions {
  vs_currency: string;
  days: string;
}

export interface CoinMarketChart {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export interface CoinMarketChartRangeOptions {
  vs_currency: string;
  from: number;
  to: number;
}


interface TableCellHeader {
  label: string;
  className: string;
}

const generalStyle = 'text-left font-medium font-bold text-gray-700 uppercase tracking-wider';

export const tableHeaders: TableCellHeader[] = [
  {
    label: 'Coin',
    className: generalStyle
  },
  {
    label: 'Symbol',
    className: generalStyle
  },
  {
    label: 'Price',
    className: generalStyle
  },
  {
    label: '1h',
    className: generalStyle
  },
  {
    label: '24h',
    className: generalStyle
  },
  {
    label: '7d',
    className: generalStyle
  },
  {
    label: '30d',
    className: generalStyle
  },
  {
    label: '24h Volume',
    className: generalStyle
  },
  {
    label: 'Quantity',
    className: generalStyle
  },
  {
    label: 'Total Quantity',
    className: generalStyle
  },
  {
    label: 'Market Capital',
    className: generalStyle
  },
];
