import React from 'react'
import Company from './CompanyCard'

const Companies = ({ companies }) => {
    return (
        <div>
            {companies.map((company, index) => <Company company={company} key={index} />)}
        </div>
    )
}

export default Companies
