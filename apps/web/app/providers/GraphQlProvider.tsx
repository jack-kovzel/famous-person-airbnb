'use client';

import React from 'react';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/app/graphql/apollo';

interface IGraphQlProviderProps {
  children: React.ReactNode;
}

const GraphQlProvider: React.FC<IGraphQlProviderProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQlProvider;
