import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
export const client = new ApolloClient({
  uri: 'https://wpe-hiring.tokopedia.net/graphql',
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          contact: {
            keyArgs: [],
            merge(_, incoming) {
              console.log(incoming);
              const isMoreData = incoming.length < 6;
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
  }),
});

export const isMoreList = makeVar<boolean>(true);
