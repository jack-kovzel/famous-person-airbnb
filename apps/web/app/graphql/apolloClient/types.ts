import {
  ApolloClient,
  DefaultOptions,
  NormalizedCacheObject,
} from '@apollo/client';

export interface ICreateApolloClientBaseParameters {
  graphqlEndpoint: string;
  wsGraphqlEndpoint: string;
  useErrorLink?: boolean;
  defaultOptions?: DefaultOptions;
}

type ICreateApolloClientReturn = ApolloClient<NormalizedCacheObject>;

export type ICreateApolloClient = (
  options: ICreateApolloClientBaseParameters,
) => ICreateApolloClientReturn;
