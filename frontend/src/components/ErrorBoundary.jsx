import { Component } from 'react';

// Last line of defence: a render error anywhere below shows this instead of a
// blank white page.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='container page not-found'>
          <p className='eyebrow'>Something broke</p>
          <h1>We hit an unexpected error.</h1>
          <p className='not-found__copy'>
            Reloading usually clears it. If it keeps happening, the details are
            in the browser console.
          </p>
          <button
            type='button'
            className='btn'
            onClick={() => window.location.reload()}
          >
            Reload the page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
