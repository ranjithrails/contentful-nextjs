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
<div className="container">
    <section className="member-details">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-4">
                    <div className="img-container">
                    <Image
                      src={'https:' + logo.fields.file.url}
                      alt={name}
                      width={500}
                      height={500}
                    />
                    </div>
                </div>
                <div className="col-lg-9 col-md-8">
                    <div className="member_designation">
                        <h2>{name}</h2>
                    </div>
                    <div className="member_desc">
                        <p>
                        {documentToReactComponents(description)}
                        </p>
                    </div>
                    <div className="member_desc">
                        <h4>Indutsry</h4>
                        <p>
                        {industry}
                        </p>
                    </div>
                    <div className="member_desc">
                        <h4>Specialities</h4>
                        <p>
                        {specialities ? specialities.join(', ') : ''}
                        </p>
                    </div>

                    <div className="member_desc">
                        <h4>Locations</h4>
                        <p>
                        {location ? location.join(',') : ''}
                        </p>
                    </div>
                    <div className="member_desc">
                        <h4>Company Year</h4>
                        <p>
                        {year}
                        </p>
                    </div>
                    <div className="member_desc">
                        <h4>Employee Count</h4>
                        <p>
                        {employeeCount}
                        </p>
                    </div>
                    <div className="bg-image ">
                        <div className="member_contact">
                            <div className="row">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <div className="media-box">
                                        <div className="media-icon">
                                            <i className="fa fa-tablet" aria-hidden="true"></i>
                                        </div>
                                        <div className="media-content">
                                            <h5>Website</h5>
                                            <p><a rel="noreferrer" target="_blank" href={website}>{website}</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <div className="media-box">
                                        <div className="media-icon">
                                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                        </div>
                                        <div className="media-content">
                                            <h5>Linkedin</h5>
                                            <p><a rel="noreferrer" target="_blank" href={linkedinUrl}>{linkedinUrl}</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    </section>
</div>
  )
}