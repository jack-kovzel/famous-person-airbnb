/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint no-underscore-dangle: 0 */
import { DefaultOptions } from '@apollo/client';

import config from '../../config.json';
import { createApolloClient } from '@/app/graphql/apolloClient';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const client = createApolloClient({
  graphqlEndpoint: config.BaseApiUrl,
  wsGraphqlEndpoint: config.BaseWSApiUrl,
  useErrorLink: true,
  defaultOptions,
});

client.defaultOptions = defaultOptions;
