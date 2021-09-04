import React from "react";
import Intro from "./components/others/name";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  redirect = () => {
    this.props.history.push("/map");
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
          <Intro />
          <button className="button" onClick={this.redirect}>let's go</button>
        </header>
      </div>
    );
  }
}

export default App;
