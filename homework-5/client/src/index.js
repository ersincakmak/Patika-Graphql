import React from 'react'
import ReactDOM from 'react-dom'
import MyApolloProvider from './apollo'
import App from './App'
import './index.css'

ReactDOM.render(
  <MyApolloProvider>
    <App />
  </MyApolloProvider>,
  document.getElementById('root')
)
