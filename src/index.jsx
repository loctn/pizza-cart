import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';

import App from './components/App';
import reducers from './reducers';


const networkInterface = createNetworkInterface({
  uri: 'https://core-graphql.dev.waldo.photos/pizza'
});

const client = new ApolloClient({
  networkInterface
});

render(
  <ApolloProvider client={client}>
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);