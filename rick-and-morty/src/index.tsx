import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom'
import client from './ApolloClient'
import App from './App'
import { FilterContextProvider } from './contexts/FilterContext'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
