import {createSlice} from '@reduxjs/toolkit';
import {localStorageGetItem, localStorageSetItem, localStorageRemoveItem} from 'helpers/storage';
import {STORAGE_KEY} from 'constants/application';

const initialState = {
  user: undefined,
  accessToken: localStorageGetItem(STORAGE_KEY.ACCESS_TOKEN),
  refreshToken: localStorageGetItem(STORAGE_KEY.REFRESH_TOKEN),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, {payload}) => {
      if (payload.accessToken) {
        localStorageSetItem(STORAGE_KEY.ACCESS_TOKEN, payload.accessToken);
        localStorageSetItem(STORAGE_KEY.REFRESH_TOKEN, payload.refreshToken);
      }
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    userLoggedOut: (state) => {
      localStorageRemoveItem(STORAGE_KEY.ACCESS_TOKEN);
      localStorageRemoveItem(STORAGE_KEY.REFRESH_TOKEN);
      state.user = undefined;
      state.accessToken = '';
      state.refreshToken = '';
    },
    setUser: (state, {payload}) => {
      state.user = payload ? payload : undefined;
    },
  },
});

export const {userLoggedIn, userLoggedOut, setUser} = authSlice.actions;

export default authSlice.reducer;
