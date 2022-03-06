import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { CoinDetails, CoinDetailsState, CoinMarket, CoinMarketChart, MapOf } from '../../../model';
import * as utils from '../../../utils';
import { RootState } from '../../index';

interface CoinsState {
  coinsMarket: MapOf<CoinMarket>;
  coinDetails: MapOf<CoinDetailsState>;
}

const initialState: CoinsState = {
  coinsMarket: {},
  coinDetails: {},
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

export const fetchCoinMarketChartRange = createAsyncThunk<CoinMarketChart, { coinId: string; from: number; to: number }>(
  'coins/fetchCoinMarketChartRange',
  async (params, thunkAPI) => {
    return await utils.fetchCoinMarketChartRange(params.coinId, params.from, params.to);
  }
);

export const coinsSlice = createSlice({
  name: 'coins',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
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
export const selectCoinsMarket = createSelector(selectCoinsMarketMap, (map: MapOf<CoinMarket>) => utils.getArrayOf<CoinMarket>(map));

export const selectCoinDetails = createSelector(
  selectCoinsDetailsMap,
  (state: RootState, coinId: string) => coinId,
  (details: MapOf<CoinDetailsState>, coinId) => details[coinId]
);

export default coinsSlice.reducer;
