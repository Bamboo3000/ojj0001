import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import Layout from '../components/layout';
import parse from 'html-react-parser';

export async function getStaticProps(context) {
  //console.log(context);
  const { data } = await client.query({
    query: gql`
      query Products {
        products {
          data {
            id
            attributes {
              title
              content
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      products: data.products.data,
    },
  };
}

export default function Home({ products }) {
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
