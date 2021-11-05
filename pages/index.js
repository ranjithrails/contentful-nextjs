import React, { useState } from 'react';
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
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
    revalidate: 20
  }
}
export default function List({ companies, locationList, specialistList}) {
  const [companyList, setcompanyList] = useState(companies);
  const filteredList = async (location, specialities, year) => {
  const filteredData =  await getFilteredCompanies(location, specialities, year);
    setcompanyList(filteredData.items);
  }
  return (
    <div className="App">
        <div className='container'>
            <header>
                <div className='wrapper'>
                    <span className='logo'>Software Companies</span>
                </div>
            </header>
            <main>
                <div className='wrapper'>
                    <CompanyFilters filteredList={filteredList} locationList={locationList} specialistList={specialistList}/>
                   { companyList && <Companies companies={companyList} /> }
                </div>
            </main>
        </div>
    </div>
);
}
