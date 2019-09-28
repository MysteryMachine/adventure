import App from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import css from './postcss.css'

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <div className={css.global}>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </div>
    )
  }
}

export default withReduxStore(MyApp)
