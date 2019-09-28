import { AppInitialProps } from 'next/app'
import { ApplicationStore } from './redux'
import { AppContextType, NextPageContext } from 'next/dist/next-server/lib/utils'
import { Router } from 'next/dist/client/router'

export interface Context extends NextPageContext {
    reduxStore: ApplicationStore
 }

export interface AppContextType extends AppContextType<Router> {
    ctx: Context
}

export type InitialProps = AppInitialProps;