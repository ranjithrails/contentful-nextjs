import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { client } from '../client';
import Companies from '../components/Companies'
import CompanyFilters from '../components/CompanyFilters';

export async function getStaticProps() {

  const res = await client.getEntries({ content_type: "company" })

  return {
    props: {
      companies: res.items,
    },
    revalidate: 1
  }
}
export default function List({ companies }) {
  const [companyList, setcompanyList] = useState(companies);
  
  const filteredList = async () => {
    console.log('inside filtered list');
    const filteredData = await client.getEntries({ 
      content_type: "company", 
      'fields.slug': "auditbee"
    });
    setcompanyList(filteredData.items);
  }

  console.log(companyList)

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
                    <CompanyFilters filteredList={filteredList}/>
                    <Companies companies={companyList} />
                </div>
            </main>
        </div>
    </div>
);
}
