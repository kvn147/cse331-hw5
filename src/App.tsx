import React, { Component } from 'react';

type AppProps = {};  // no props

type AppState = {
  // TODO (Task 8): add state variables for the app
};


/** Top-level component that displays the entire UI. */
export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      // TODO (Task 8): add state variables for the app
    }
  }

  render = (): JSX.Element => {
    // TODO (Task 8): add html to render
    return <div style={{fontFamily: "sans-serif"}}></div>;
  }

  // TODO (Task 8): add event handlers as needed

}
