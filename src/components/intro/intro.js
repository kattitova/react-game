import React, { Component } from "react";
import Animation from "./animation";
import IntroText from "./intro-text";
import Menu from "./menu";

export default class Intro extends Component {
  constructor() {
    super();
    this.state = {
      intro: "intro",
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

  onMenuItemClick = (id) => {
    const { intro } = this.state;
    let introClass = intro;
    switch (id) {
      case "new-game":
        introClass += " hidden";
        this.setState({ intro: introClass });
        break;

      case "continue-game":
        introClass += " hidden";
        this.setState({ intro: introClass });
        break;

      default: break;
    }
  }

  render() {
    const { intro, text, menu } = this.state;
    return (
      <div className={intro}>
        <Animation />
        <div className="intro__wrapper">
          <IntroText textClass={text} onChangeClass={this.changeClass} />
          <Menu menuClass={menu} onMenuItemClick={this.onMenuItemClick} />
        </div>
      </div>
    );
  }
}
