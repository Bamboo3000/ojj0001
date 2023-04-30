import { gql } from '@apollo/client';

export const GET_ALL_PAGES = gql`
  query {
    pages {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = gql`
  query getPageBySlug($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
  }
`;
