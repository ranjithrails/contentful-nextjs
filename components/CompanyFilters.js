import React, { Fragment } from 'react';

const CompanyFilters = ({ filteredList }) => {

  return (
    <Fragment>
      <button onClick={filteredList}>
        Activate Filters
      </button>
    </Fragment>
  )
};

export default CompanyFilters;