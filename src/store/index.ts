import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';
import coinsReducer from './features/coins';
// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    coins: coinsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
