import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        contact: {
          keyArgs: [],
          merge(_, incoming) {
            console.log('isMoreData', incoming);
            const isMoreData = incoming.length < 11;
            isMoreList(!isMoreData);
            if (!isMoreData) {
              incoming.pop();
            }
            return incoming;
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: 'https://wpe-hiring.tokopedia.net/graphql',
  connectToDevTools: true,
  cache,
});

export const isMoreList = makeVar<boolean>(true);
