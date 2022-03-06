import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoinDetails, CoinDetailsState, CoinMarket, CoinMarketChart, MapOf } from '../../../model';
import * as utils from '../../../utils';
import { RootState } from '../../index';

type SortOrder = 'asc' | 'desc';

interface Sort {
  key: string;
  order: SortOrder;
}

interface Filters {
  searchInput: string;
  resultsPerPage: number;
  page: number;
  sort: Sort;
}

interface CoinsState {
  coinsMarket: MapOf<CoinMarket>;
  coinDetails: MapOf<CoinDetailsState>;
  filters: Filters;
}

const initialState: CoinsState = {
  coinsMarket: {},
  coinDetails: {},
  filters: {
    searchInput: '',
    resultsPerPage: 20,
    page: 0,
    sort: {
      key: '',
      order: 'asc',
    },
  },
};

// First, create the thunk
export const fetchCoinsMarketData = createAsyncThunk<CoinMarket[]>('coins/fetchCoinsMarketData', async () => {
  return await utils.fetchMarketData();
});
export const fetchCoinDetails = createAsyncThunk<CoinDetailsState, { coinId: string; from: number; to: number }>(
  'coins/fetchCoinDetails',
  async ({ coinId, from, to }, thunkAPI) => {
    const details = await utils.fetchCoinDetails(coinId);
    const market = await utils.fetchCoinMarketChartRange(coinId, from, to);

    return { ...details, ...market };
  }
);

export const coinsSlice = createSlice({
  name: 'coins',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCoinsMarketData.fulfilled, (state, action) => {
      // Add user to the state array
      state.coinsMarket = utils.getMapOf<CoinMarket>(action.payload, 'id');
    });
    builder.addCase(fetchCoinDetails.fulfilled, (state, action) => {
      // Add user to the state array
      state.coinDetails[action.payload.id] = action.payload;
    });
  },
});

const selectCoinsState = (state: RootState): CoinsState => state.coins;
const selectCoinsMarketMap = createSelector(selectCoinsState, (state) => state.coinsMarket);
const selectCoinsDetailsMap = createSelector(selectCoinsState, (state) => state.coinDetails);
const selectFilters = createSelector(selectCoinsState, (state) => state.filters);
export const selectSearchInput = createSelector(selectFilters, (filters) => filters.searchInput);
export const selectResultsPerPage = createSelector(selectFilters, (filters) => filters.resultsPerPage);
export const selectPage = createSelector(selectFilters, (filters) => filters.page);
export const selectSort = createSelector(selectFilters, (filters) => filters.sort);
export const selectCoinsMarket = createSelector(selectCoinsMarketMap, (map: MapOf<CoinMarket>) => utils.getArrayOf<CoinMarket>(map));

export const selectCoinsMarketFiltered = createSelector(selectCoinsMarket, selectFilters, (coins, { page, resultsPerPage }) =>
  coins.slice(page * resultsPerPage, (page + 1) * resultsPerPage)
);

export const selectCoinDetails = createSelector(
  selectCoinsDetailsMap,
  (state: RootState, coinId: string | undefined) => coinId ?? '',
  (details: MapOf<CoinDetailsState>, coinId) => details[coinId]
);

export default coinsSlice.reducer;
