import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Company = ({ company }) => {
    const { name, specialities, slug, year, location, industry, logo} = company.fields
    return (
    <div className="col-md-4 mt-4">
    <div className="card mb-4 box-shadow p-2 h-100">
    <Image
      src={'https:' + logo.fields.file.url}
      alt={name}
      width={500}
      height={300}
      className="card-img-top"
    />
        <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text"><strong>Industry: </strong>{industry}</p>
        <p className="card-text"><strong>Specialities: </strong> {specialities ? specialities.join(',') : ''}</p>
        <p className="card-text"><strong>Locations: </strong>{location ? location.join(',') : ''}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link href={'/company/' + slug}><a href="#" className="btn btn-primary">View More</a></Link>
          <small className="text-muted">{year}</small>
        </div>
      </div>
    </div>
  </div>
    )
}


export default Company