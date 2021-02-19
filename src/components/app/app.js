import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Intro from "../intro";
import Game from "../game";

export default class App extends Component {
  state = {
    introClass: "intro",
    introTextClass: "active",
    menuClass: "",
  };

  // function - click on Start Button to go to Main Menu from Intro
  onClickStartButton = () => {
    this.setState(
      {
        introTextClass: "",
        menuClass: "active",
      },
    );
  }

  render() {
    const {
      introClass, introTextClass, menuClass,
    } = this.state;

    return (
      <Router>
        <div className="game-container">
          <Switch>
            <Route exact path="/">
              <Intro
                introClass={introClass}
                introTextClass={introTextClass}
                menuClass={menuClass}
                onClickStartButton={this.onClickStartButton}
              />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
