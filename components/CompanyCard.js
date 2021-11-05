import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Company = ({ company }) => {
    const { name, shortDescription, specialities, thumbnailImages, slug, year, location, industry} = company.fields
    // const postDescription = description
    return (
        <div className='post'>
            <h2 className='title'>{name}</h2>
            Specialities: {specialities ? specialities.join(',') : ''} <br/>
            Year: {year}<br/>
            location: {location ? location.join(',') : ''}<br/>
            Industry: {industry}<br/>
            <Link href={'/company/' + slug}><a>View Details</a></Link>
            {/* {thumbnailImages && <img className='thumbnailImages' src={thumbnailImages.fields.file.url} alt={name} title={name} />} */}
            {/* <section dangerouslySetInnerHTML={{ __html: postDescription }} /> */}
        </div>
    )
}

export default Company