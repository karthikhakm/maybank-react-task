import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Async thunk to handle Google Places search
export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces', //Action type
  async (place, { rejectWithValue }) => {
    try {
      //Initialize the Google Places Service
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      //Return a promise that resolves with the results of the search
      const results = await new Promise((resolve, reject) => {
        service.textSearch({ query: place }, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(results); //Resolve with the results if successful
          } else {
            reject('Error fetching places'); //Reject if there's an error
          }
        });
      });

      //Format the result for the first place returned
      const selectedPlace = results[0];
      if (selectedPlace.geometry) {
        return {
          name: selectedPlace.name, //Place name
          address: selectedPlace.formatted_address, //Place address
          location: {
            lat: selectedPlace.geometry.location.lat(), //Latitude
            lng: selectedPlace.geometry.location.lng(), //Longitude
          },
        };
      }
    } catch (error) {
      return rejectWithValue(error); //Reject the promise with the error message
    }
  }
);

//Slice to handle the 'places' state
export const placeSlice = createSlice({
  name: 'places', //Name of the slice
  initialState: {
    searchResults: [], //Array to store search results
    selectedPlace: null, //State for the currently selected place
    loading: false, //Loading state to track async request status
    error: null, //Optional state to handle errors
  },
  reducers: {
    //Reducer to add a search result
    addSearchResult: (state, action) => {
      state.searchResults.push(action.payload);
    },
    //Reducer to set the selected place
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
    //Reducer to set the loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    //Reducer to set the error state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true; //Set loading to true when the API request starts
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false; //Set loading to false when the request completes
        state.searchResults.push(action.payload); //Add fetched place to searchResults
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false; //Set loading to false if the request fails
        state.error = action.payload; //Optionally set the error message
      });
  },
});

//Export actions for use in components
export const { addSearchResult, setSelectedPlace, setLoading, setError } = placeSlice.actions;

//Export the reducer to be used in the store
export default placeSlice.reducer;
