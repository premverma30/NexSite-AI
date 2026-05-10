import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-6">
          <div className="max-w-xl w-full bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <h1 className="text-xl font-bold">Something went wrong</h1>
            </div>
            <p className="text-zinc-400 mb-6 text-sm">
              The application encountered an unexpected error. Our team has been notified.
            </p>
            <div className="bg-black/50 border border-white/5 p-4 rounded-xl overflow-x-auto text-xs font-mono text-zinc-500 mb-6">
              {this.state.error?.toString()}
            </div>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
