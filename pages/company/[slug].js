import { client } from '../client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
// import Skeleton from '../../components/Skeleton'

export const getStaticPaths = async () => {

  const res = await client.getEntries({ 
    content_type: "company" 
  })
  console.log('----------- inside get static paths', res);

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'company',
    'fields.slug': params.slug
  }) 
  console.log('----------- inside get static props',items[0]);
  console.log('static items ------->',items)
  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { company: items[0] },
    revalidate: 20
  }
}

export default function CompanyDetails({ company }) {
  // if (!company) return <Skeleton />

  const { name, slug, website, industry, specialities, employeeCount, location, linkedinUrl, type, year, description, logoUrl } = company.fields

  return (
    <div>
      <div className="banner">
        {/* <Image 
          src={'https:' + logoUrl.fields.file.url}
          width={logoUrl.fields.file.details.image.width}
          height={logoUrl.fields.file.details.image.height}
        /> */}
        <h2>{ name }</h2>
      </div>

      <div className="info">
        <p>Takes about { location } mins to cook.</p>
        <h3>specialities:</h3>

        {specialities.map(speciality => (
          <span key={speciality}>{ speciality }</span>
        ))}
      </div>
        
      <div className="method">
        <h3>description:</h3>
        <div>{documentToReactComponents(description)}</div>
      </div>

     
    </div>
  )
}