import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getAllCompanies, getCompanyBySlug} from '../../contentful/util';

export const getStaticPaths = async () => {
  const allCompanies = await getAllCompanies();
  const paths = allCompanies.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  });
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await getCompanyBySlug(params.slug);
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
  if (!company) return (
    <div>Loading..</div>
  )

  const { name, slug, website, industry, specialities, employeeCount, location, linkedinUrl, type, year, description, logo } = company.fields
  return (
    <div>
      <div className="banner">
        {/* <Image 
          src={'https:' + logoUrl.fields.file.url}
          width={logoUrl.fields.file.details.image.width}
          height={logoUrl.fields.file.details.image.height}
        /> */}
      <Image
      src={'https:' + logo.fields.file.url}
      alt="Picture of the author"
      width={500}
      height={500}
    />
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