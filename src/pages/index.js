import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import Layout from '../components/layout';

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Products {
        products {
          data {
            id
          }
        }
      }
    `,
  });
  console.log(data.products.data);
  return {
    props: {
      products: data.products.data,
    },
  };
}

export default function Home() {
  return (
    <Layout>
      <div>
        <p>
          Get started by editing&nbsp;
          <code>src/pages/index.js</code>
        </p>
        <div>
          <a
            href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            By{' '}
            <Image
              src='/vercel.svg'
              alt='Vercel Logo'
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
    </Layout>
  );
}
