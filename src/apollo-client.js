import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/graphql';

const link = createHttpLink({
  uri: GRAPHQL_URL,
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
