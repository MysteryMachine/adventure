import App from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import css from './postcss.css' 
import { ApplicationStore } from '../types/redux'
import { ChildrenMixin } from '../types/react'

export interface _AppProps {
  reduxStore: ApplicationStore;
}

export class _App extends App<_AppProps & ChildrenMixin> {
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

export default withReduxStore(_App)
