import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Main from './components/Main';
import { backendURL} from './config'


// apollo client setup
const client = new ApolloClient({
  uri: `${backendURL}/graphql`
});


// App Component
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
// Export the App component so that it can be used in index.js
export default App;
