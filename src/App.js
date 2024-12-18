import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LoadScript } from '@react-google-maps/api';
import SearchBar from './components/SearchBar';
import Map from './components/Map';

const App = () => {
  return (
    //For easy review purpose, API key is directly included. 
    //As a best practice (security risk mitigation), this key should be moved to an .env file.
    <LoadScript googleMapsApiKey="AIzaSyDRWV1kCN8yS8Tkc7ngdPyikPyuQk6y4rE" libraries={['places']}> 
      <Container>
        <Row className="mt-4">
          <Col>
            <h2>Google Places Autocomplete</h2>
            <SearchBar />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Map />
          </Col>
        </Row>
      </Container>
    </LoadScript>
  );
};

export default App;