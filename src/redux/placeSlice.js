import { createSlice } from '@reduxjs/toolkit';

export const placeSlice = createSlice({
  name: 'places',
  initialState: {
    searchResults: [],
  },
  reducers: {
    addSearchResult: (state, action) => {
      state.searchResults.push(action.payload);
    },
  },
});

export const { addSearchResult } = placeSlice.actions;
export default placeSlice.reducer;
