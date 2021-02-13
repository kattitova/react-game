import React, { Component } from "react";
import Animation from "./animation";
import IntroText from "./intro-text";
import Menu from "./menu";

export default class Intro extends Component {
  constructor() {
    super();
    this.state = {
      text: "active",
      menu: "",
    };
  }

  changeClass = () => {
    this.setState(
      {
        text: "",
        menu: "active",
      },
    );
  }

  render() {
    const { text, menu } = this.state;
    return (
      <div className="intro">
        <Animation />
        <div className="intro__wrapper">
          <IntroText textClass={text} onChangeClass={this.changeClass} />
          <Menu menuClass={menu} />
        </div>
      </div>
    );
  }
}
