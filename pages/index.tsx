import React from 'react';
import { Login } from '../features/Login';

export default class Index extends React.Component {
  timer: NodeJS.Timeout | undefined;

  componentDidMount() {
    this.timer = setInterval(() => {}, 1000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  render() {
    return <Login />;
  }
}
