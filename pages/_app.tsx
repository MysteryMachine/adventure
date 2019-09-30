import App from 'next/app';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { ApplicationStore } from '../types/redux';
import { ChildrenMixin } from '../types/react';
import css from './postcss.css';

export interface _AppProps {
  reduxStore: ApplicationStore;
}

export class _App extends App<_AppProps & ChildrenMixin> {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <div className={css.globalStyle}>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </div>
    );
  }
}

export default withReduxStore(_App);
