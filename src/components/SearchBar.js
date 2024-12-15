import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchResult } from '../redux/placeSlice';
import { InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.places.searchResults);
  const [place, setPlace] = useState('');

  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
          types: ['geocode'],
        }
      );

      autocomplete.addListener('place_changed', () => {
        const selectedPlace = autocomplete.getPlace();
        if (selectedPlace.geometry) {
          dispatch(addSearchResult(selectedPlace));
        }
      });
    }
  }, [dispatch]);

  const handleClear = () => {
    setPlace('');
  };

  const handleHistoryClick = (place) => {
    // Optional: Do something when a history item is clicked, like center the map on the selected place.
    console.log('Selected from history:', place);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          id="autocomplete"
          placeholder="Search for a place"
          aria-label="Search for a place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleClear}>
          Clear
        </Button>
      </InputGroup>

      <h5>Search History</h5>
      <ListGroup>
        {searchResults.map((result, index) => (
          <ListGroup.Item
            key={index}
            onClick={() => handleHistoryClick(result)}
            style={{ cursor: 'pointer' }}
          >
            {result.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SearchBar;
