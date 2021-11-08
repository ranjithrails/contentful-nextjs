import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { Multiselect } from "multiselect-react-dropdown";

const CompanyFilters = ({ filteredList, locationList, specialistList}) => {
  const locationListFormatted = [... new Set(locationList.flat().sort())];
  const specialistListFormatted = [... new Set(specialistList.flat().sort())];
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedspecialist, setSelectedspecialist] = useState([]);
  const firstRender = useRef(true);

  useEffect(() => {
    if(!firstRender.current) {
      filteredList(selectedLocation, selectedspecialist, '');
    }
    firstRender.current = false;
  },[selectedLocation, selectedspecialist]);

  return (
    <Container >
      <Row>
      <Col md={3}>
      <Multiselect 
      selectedValues={selectedLocation}
      onSelect={setSelectedLocation}
      onRemove={setSelectedLocation}
      showArrow
      avoidHighlightFirstOption
      options={locationListFormatted} 
      isObject={false} placeholder = "Location"/>
      </Col>
      <Col md={3}>
      <Multiselect 
      selectedValues ={selectedspecialist}
      onSelect={setSelectedspecialist}
      onRemove={setSelectedspecialist}
      showArrow 
      avoidHighlightFirstOption
      options={specialistListFormatted} 
      isObject={false} placeholder = "Specialities"/>
      </Col>
      </Row>
    </Container>
  )
};

export default CompanyFilters;