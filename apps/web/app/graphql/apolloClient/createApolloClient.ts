import {
  ApolloClient,
  ApolloError,
  ApolloLink,
  concat,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';

import { GraphqlHeaders } from '../enums';

import {
  createAuthorizationHeader,
  createEndpoint,
  customFetch,
} from './helpers';
import { ICreateApolloClient } from './types';

export const createApolloClient: ICreateApolloClient = ({
  defaultOptions,
  graphqlEndpoint,
  wsGraphqlEndpoint,
  useErrorLink,
}) => {
  const withIdToken = setContext(
    async (): Promise<{ token: string | null }> => {
      return { token: 'will change it' };
    },
  );

  const authMiddleware = new ApolloLink((operation, forward) => {
    const { token } = operation.getContext();

    operation.setContext(() => ({
      headers: {
        ...operation.getContext().headers,
        [GraphqlHeaders.AUTHORIZATION]: createAuthorizationHeader(token),
      },
    }));

    return forward(operation);
  });

  const errorLink = onError(({ operation, forward, response }) => {
    const observable = forward(operation);

    if (!response?.data && response?.errors?.length) {
      return Observable.of(response).map(() => {
        throw new ApolloError({ graphQLErrors: response?.errors });
      });
    }

    return observable;
  });

  const uploadLink = createUploadLink({
    uri: createEndpoint(graphqlEndpoint),
    fetch: customFetch,
  });

  const getApolloLinksFlow = (): ApolloLink => {
    const getTerminatingApolloLink = (): ApolloLink => {
      if (wsGraphqlEndpoint) {
        const wsLink = new GraphQLWsLink(
          createClient({
            url: createEndpoint(wsGraphqlEndpoint),
            connectionParams: async () => ({
              [GraphqlHeaders.AUTHORIZATION]: createAuthorizationHeader('123'),
            }),
          }),
        );

        return ApolloLink.split(
          ({ query }) => {
            const definition = getMainDefinition(query);

            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink,
          uploadLink as unknown as ApolloLink,
        );
      }

      return uploadLink as unknown as ApolloLink;
    };

    return ApolloLink.from([
      withIdToken,
      ...(useErrorLink ? [errorLink] : []),
      concat(authMiddleware, getTerminatingApolloLink()),
    ]);
  };

  return new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache(),
    link: getApolloLinksFlow(),
    defaultOptions,
  });
};
