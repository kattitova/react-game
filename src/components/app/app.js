import React, { Component } from "react";
import Intro from "../intro";

export default class App extends Component {
  render() {
    return (
      <div className="game-container">
        <Intro />
        <div className="game" />
      </div>
    );
  }
}
