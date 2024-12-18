import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces, setSelectedPlace } from "../redux/placeSlice";
import {
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Spinner,
} from "react-bootstrap";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(
    (state) => state.places //Access the places state from Redux store
  );
  const [place, setPlace] = useState(""); //Local state for place input

  //Check if the Google API is loaded and accessible
  const isApiLoaded =
    typeof window.google !== "undefined" && window.google.maps;

  //Initialize Google Places Autocomplete when API is loaded
  useEffect(() => {
    if (isApiLoaded) {
      const inputElement = document.getElementById("autocomplete");
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputElement,
        {
          types: ["geocode"], //Restrict the autocomplete to geocode results (addresses, locations)
        }
      );

      //Set up listener to fetch places when user selects a place from suggestions
      autocomplete.addListener("place_changed", () => {
        const selectedPlace = autocomplete.getPlace();
        if (selectedPlace.geometry) {
          dispatch(fetchPlaces(selectedPlace.name)); //Dispatch fetchPlaces action to get place details
        }
      });
    }
  }, [isApiLoaded, dispatch]); //Effect runs when API is loaded or dispatch changes

  //Clear the search input field
  const handleClear = () => {
    setPlace("");
  };

  //Handle search history click, sets the selected place
  const handleHistoryClick = (place) => {
    dispatch(setSelectedPlace(place)); //Dispatch selected place to Redux state
  };

  //Handle Enter key press to trigger place search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (place.trim()) {
        dispatch(fetchPlaces(place)); //Dispatch fetchPlaces action to search for place
      }
    }
  };

  return (
    <div>
      <div className="mb-4">
        <InputGroup>
          <FormControl
            id="autocomplete"
            placeholder="Search for a location"
            value={place}
            onChange={(e) => setPlace(e.target.value)} //Update place input on change
            onKeyDown={handleKeyPress} //Handle key press events
          />
          <Button variant="danger" onClick={handleClear}>
            Clear
          </Button>
        </InputGroup>

        {loading && (
          //Show loading spinner when fetching results
          <div className="d-flex justify-content-center mt-4">
            <Spinner animation="border" variant="primary" className="me-2" />
            <span>Searching...</span>
          </div>
        )}

        {error && <div className="mt-2 mx-1 text-danger">{error}</div>} {/* Display error if exists */}
      </div>

      <h5>Search History</h5>
      <ListGroup className="mb-2">
        {searchResults.map((result, index) => (
          <ListGroup.Item
            key={index}
            onClick={() => handleHistoryClick(result)} //Handle history item click
            style={{ cursor: "pointer" }}
          >
            {result.name} {/* Display place name */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SearchBar;
