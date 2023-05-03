import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import Layout from '../components/layout';
import parse from 'html-react-parser';

export async function getStaticProps(context) {
  console.log(context);
  const { data: products } = await client.query({
    query: gql`
      query Products {
        products {
          data {
            id
            attributes {
              title
              short_content
              content
              price
              in_stock
              feature_image {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    mime
                    url
                    formats
                  }
                }
              }
              images {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    mime
                    url
                    formats
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  const { data: pages } = await client.query({
    query: gql`
      query Pages {
        pages(filters: { slug: { eq: "home" } }) {
          data {
            id
            attributes {
              title
              slug
              sections {
                ... on ComponentSectionsSlider {
                  Slides {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      products: products.products.data,
      pages: pages.pages.data,
    },
  };
}

export default function Home({ products, pages }) {
  console.log(pages);
  return (
    <Layout>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h1>{product.attributes.title}</h1>
            {parse(product.attributes.content)}
          </div>
        ))}
      </div>
    </Layout>
  );
}
