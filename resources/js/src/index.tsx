import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'
import HeaderProvider from './providers/header'
import GlobalStyle from './styles/globals'

if (document.getElementById('app')) {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <HeaderProvider>
          <GlobalStyle />
          <App />
        </HeaderProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('app')
  )
}
