import React from 'react'
import { connect } from 'react-redux'
import HelloWorld from '../features/helloWorld'
import { Context } from '../types/next'

class Index extends React.Component {
  static getInitialProps ({ /*reduxStore, req*/ } : Context) {
    // const isServer = !!req
    // reduxStore.dispatch(...)

    return {
      initialized: true,
    }
  }

  timer : NodeJS.Timeout | undefined;

  componentDidMount () {
    this.timer = setInterval(() => {}, 1000)
  }

  componentWillUnmount () {
    if(this.timer) clearInterval(this.timer)
  }

  render () {
    return <HelloWorld />
  }
}

export default connect(
  () => ({ }),
  () => ({ })
)(Index)
