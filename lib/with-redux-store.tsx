import React from 'react'
import { initializeStore } from '../reducers'
import { _App, _AppProps } from '../pages/_app';
import { AppContextType, InitialProps } from '../types/next';
import { ApplicationStore } from '../types/redux';
import { NextComponentType, NextPageContext } from 'next';
import { Router } from 'next/dist/client/router';
const isServer = typeof window === 'undefined'
let reduxStore : ApplicationStore | undefined;

const getOrCreateStore = () => {
  if (isServer) {
    return initializeStore()
  }
  if (!reduxStore) {
    reduxStore = initializeStore()
  }
  return reduxStore
}

type ComponentProps =
  _AppProps & InitialProps & { Component: NextComponentType<NextPageContext, any, {}>; router: Router; }


export default (App : typeof _App) => {
  return class AppWithRedux extends React.Component<ComponentProps> {
    reduxStore: ApplicationStore;

    static async getInitialProps (appContext : AppContextType) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor (props : ComponentProps) {
      super(props)
      this.reduxStore = getOrCreateStore()
    }

    render () {
      return <App {...this.props} reduxStore={this.reduxStore}/>
    }
  }
}
