import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import Hero from "../components/Hero"
import { getAllCompanies, getFilteredCompanies } from '../contentful/util';
import Companies from '../components/Companies'
import CompanyFilters from '../components/CompanyFilters';

export async function getStaticProps() {
  const locationList = [];
  const specialistList = [];
  const allCompanies = await getAllCompanies();
  allCompanies.items.map(company => {
      let companyFields = company.fields;
      if(companyFields) {
        companyFields.location ? locationList.push(companyFields.location) : '';
        companyFields.specialities ? specialistList.push(companyFields.specialities) : '';
      }
  });
  return {
    props: {
      companies: allCompanies.items,
      locationList: locationList,
      specialistList: specialistList
    },
    revalidate: 60
  }
}

export default function List({ companies, locationList, specialistList}) {
  const [companyList, setcompanyList] = useState(companies);
  const filteredList = async (location, specialities, year) => {
  const filteredData =  await getFilteredCompanies(location, specialities, year);
    setcompanyList(filteredData.items);
  }
  return (
    <>
    <Hero />
    <Row>
    <div className="py-5 bg-light">
    <div className="container">
      <CompanyFilters filteredList={filteredList} locationList={locationList} specialistList={specialistList}/>
      { companyList && <Companies companies={companyList} /> }
    </div>
    </div>
    </Row>         
    </>
);
}
