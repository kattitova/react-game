import React, { Component } from "react";
import PropTypes from "prop-types";
import Animation from "./animation";
import IntroText from "./intro-text";
import Menu from "./menu";
import Footer from "./footer";

export default class Intro extends Component {
  render() {
    const {
      introClass, introTextClass, menuClass, onClickStartButton, onClickMenuButton,
    } = this.props;
    return (
      <div className={introClass}>
        <Animation />
        <div className="intro__wrapper">
          <IntroText textClass={introTextClass} onClickStartButton={onClickStartButton} />
          <Menu
            menuClass={menuClass}
            onClickMenuButton={onClickMenuButton}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

Intro.propTypes = {
  introClass: PropTypes.string,
  introTextClass: PropTypes.string,
  menuClass: PropTypes.string,
  onClickStartButton: PropTypes.func,
  onClickMenuButton: PropTypes.func,
};

Intro.defaultProps = {
  introClass: null,
  introTextClass: null,
  menuClass: null,
  onClickStartButton: null,
  onClickMenuButton: null,
};
