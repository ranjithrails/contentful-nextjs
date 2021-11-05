import React, { Fragment, useState, useEffect, useRef } from 'react';
import { MultiSelect } from "react-multi-select-component";

const CompanyFilters = ({ filteredList, locationList, specialistList}) => {
  const locationListFormatted = [... new Set(locationList.flat().sort())].map((location) => { return {label: location, value: location}});
  const specialistListFormatted = [... new Set(specialistList.flat().sort())].map((specialist) => { return {label: specialist, value: specialist}});
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedspecialist, setselectedspecialist] = useState([]);
  const firstRender = useRef(true);

  useEffect(() => {
    if(!firstRender.current) {
      filteredList(selectedLocation, selectedspecialist, '');
    }
    firstRender.current = false;
  },[selectedLocation, selectedspecialist]);

  return (
    <Fragment>
       <MultiSelect
        options={locationListFormatted}
        value={selectedLocation}
        onChange={setSelectedLocation}
        labelledBy="Select Location"
      />

    <MultiSelect
        options={specialistListFormatted}
        value={selectedspecialist}
        onChange={setselectedspecialist}
        labelledBy="Select Location"
    />
    </Fragment>
  )
};

export default CompanyFilters;