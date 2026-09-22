import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0c10] text-zinc-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-white/10 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Application Notice</h2>
              <p className="text-xs text-zinc-400">
                A display refresh was required. Click below to restore store state and view the live catalog.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-[11px] text-zinc-400 font-mono text-left max-h-24 overflow-y-auto">
                {this.state.error.message}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-full bg-[#daf73d] text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#cbe830] transition-all active:scale-95 shadow-lg shadow-[#daf73d]/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restore &amp; Reload Store Catalog</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
