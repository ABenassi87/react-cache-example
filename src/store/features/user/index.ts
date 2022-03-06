import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../index';

interface UserState {
  username: string;
  email: string;
  name: string;
  avatar: string;
}

const initialState: UserState = {
  username: 'jdoe',
  avatar: 'https://avatars0.githubusercontent.com/u/4323180?s=460&v=4',
  email: 'jdoe@example.com',
  name: 'John Doe',
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state, action: PayloadAction<Partial<UserState>>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { update } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
const selectUser = (state: RootState): UserState => state.user;
export const selectUsername = createSelector(selectUser, (userState: UserState) => userState.username);
export const selectEmail = createSelector(selectUser, (userState: UserState) => userState.email);
export const selectAvatar = createSelector(selectUser, (userState: UserState) => userState.avatar);
export const selectName = createSelector(selectUser, (userState: UserState) => userState.name);

export const selectUserData = createSelector(selectUsername, selectAvatar, (username, avatar) => ({ username, avatar }));


export default userSlice.reducer;
