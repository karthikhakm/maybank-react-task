import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './placeSlice';
import { thunk } from 'redux-thunk';

//Configure the Redux store with 'places' reducer and thunk middleware
export const store = configureStore({
  reducer: {
    places: placeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
