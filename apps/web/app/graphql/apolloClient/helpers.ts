const getBodyOperationName = (body: string): string | undefined =>
  JSON.parse(body)?.operationName;

export const customFetch = (
  uri: string,
  options: RequestInit,
): Promise<Response> => {
  if (options?.body) {
    let operationName: string | undefined;

    if (options.body instanceof FormData) {
      const bodyOperationsValue = (options.body as FormData).get('operations');

      if (bodyOperationsValue && typeof bodyOperationsValue === 'string') {
        operationName = getBodyOperationName(bodyOperationsValue);
      }
    } else {
      operationName = getBodyOperationName(options.body as string);
    }

    if (operationName) {
      return fetch(`${uri}?operationName=${operationName}`, options);
    }
  }

  return fetch(uri, options);
};

export const createAuthorizationHeader = (
  tokenString?: string | null,
): string | null => (tokenString ? `Bearer ${tokenString}` : null);

export const createEndpoint = (endpointString: string): string =>
  `${endpointString}/graphql`;
