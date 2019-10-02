import React from 'react';
import { Register } from '../features/Register';
import { Context } from '../types/next';
import { INIT } from '../actions/user-actions';

export default class RegisterPage extends React.Component {
  static getInitialProps({ reduxStore }: Context) {
    reduxStore.dispatch(INIT());

    return { initialized: true };
  }

  render() {
    return <Register />;
  }
}
