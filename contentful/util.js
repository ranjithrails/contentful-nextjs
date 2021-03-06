import { client } from './client';

export const getAllCompanies = async () => {
  return await client.getEntries({ 
    content_type: "company",
    order: "fields.name"
  });
};

export const getCompanyBySlug = async (slug) => {
  return await client.getEntries({
    content_type: 'company',
    'fields.slug': slug
  }) 
};

export const getFilteredCompanies = async (locations, specialities,  year) => {
  return await client.getEntries({ 
    content_type: "company",
    order: "fields.name", 
    'fields.location[in]': locations.length > 0 ? locations.join() : [],
    'fields.specialities[in]': specialities.length > 0 ? specialities.join(): [],
  });
};

