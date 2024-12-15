import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import Map from './components/Map';

const App = () => {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Google Places Autocomplete</h2>
          <SearchBar />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Map />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
