import { ApolloClient, HttpLink, InMemoryCache, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        contact: {
          keyArgs: [],
          merge(_, incoming) {
            const isMoreData = incoming.length < 11;
            isMoreList(!isMoreData);
            if (!isMoreData) {
              const newData = [...incoming];
              newData.pop();
              return newData;
            }
            return incoming;
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  connectToDevTools: true,
  credentials: 'include',
  link: new HttpLink({ uri: 'https://wpe-hiring.tokopedia.net/graphql' }),
  cache,
});

export const isMoreList = makeVar<boolean>(true);
