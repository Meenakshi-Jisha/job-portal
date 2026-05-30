import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // log to console for debugging
    console.error('ErrorBoundary caught error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{padding:20}}>
          <h2>Something went wrong</h2>
          <pre style={{whiteSpace:'pre-wrap',color:'#b00'}}>{String(this.state.error && this.state.error.message)}</pre>
          <details style={{whiteSpace:'pre-wrap'}}>
            {this.state.error && this.state.error.stack}
          </details>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
