import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children

    return <main className="error-boundary" role="alert">
      <span>UTOMIC</span>
      <h1>Something went wrong.</h1>
      <p>The page could not load correctly. Refresh to try again.</p>
      <button type="button" onClick={() => window.location.reload()}>REFRESH PAGE</button>
    </main>
  }
}
