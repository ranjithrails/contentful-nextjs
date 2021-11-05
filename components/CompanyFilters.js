import React, { Fragment, useState, useEffect, useRef } from 'react';
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
    <Fragment>
      <Multiselect 
      selectedValues={selectedLocation}
      onSelect={setSelectedLocation}
      onRemove={setSelectedLocation}
      showArrow 
      options={locationListFormatted} 
      isObject={false} />
      <Multiselect 
      selectedValues ={selectedspecialist}
      onSelect={setSelectedspecialist}
      onRemove={setSelectedspecialist}
      showArrow 
      options={specialistListFormatted} 
      isObject={false} />
    </Fragment>
  )
};

export default CompanyFilters;