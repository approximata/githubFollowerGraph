import React from 'react';
import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import MainView from './components/MainView';

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${
        process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
        }`
    }
  }
});

const link = authLink.concat(httpLink);

const createApolloClient = () => (
  new ApolloClient({
    link: link,
    cache: new InMemoryCache()
  })
);

const App = () => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <MainView />
    </ApolloProvider>
  )

}

export default App;
