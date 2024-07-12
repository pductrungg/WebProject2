import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: false,
  collapsed: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleLoading: (state, {payload}) => {
      state.status = payload;
    },
    setCollapsed: (state, {payload}) => {
      state.collapsed = payload;
    },
  },
});

export const {toggleLoading, setCollapsed} = globalSlice.actions;

export default globalSlice.reducer;
