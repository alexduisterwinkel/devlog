
'use client';

import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
          Something went wrong while rendering entries.
        </div>
      );
    }

    return this.props.children;
  }
}
