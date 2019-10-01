import React from 'react';
import { connect } from 'react-redux';
import { Login } from '../features/Login';

class Index extends React.Component {
  static getInitialProps(/*{ reduxStore, req }: : Context*/) {
    // const isServer = !!req
    // reduxStore.dispatch(...)

    return {
      initialized: true,
    };
  }

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

export default connect(
  () => ({}),
  () => ({}),
)(Index);
