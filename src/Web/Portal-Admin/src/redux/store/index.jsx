import {configureStore} from '@reduxjs/toolkit';
import globalSlice from 'redux/reducers/globalSlice';
import authSlice from 'redux/reducers/authSlice';

export default configureStore({
  reducer: {
    global: globalSlice,
    auth: authSlice,
  },
});
