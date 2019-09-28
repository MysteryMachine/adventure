import React from 'react'
import { connect } from 'react-redux'
import HelloWorld from '../features/helloWorld'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    // reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }

  componentDidMount () {
    this.timer = setInterval(() => {}, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return <HelloWorld />
  }
}

export default connect(
  () => ({ }),
  () => ({ })
)(Index)
