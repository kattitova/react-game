/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import rocketSVG from "../../../assets/img/rocket-letters.svg";
import BackButton from "../../game/back-button";

export default class Settings extends Component {
  generateRocketColors = () => {
    const { getRocketColor } = this.props;
    const colors = ["prp", "grn", "red", "blue", "yel", "gray"];
    return (
      colors.map(color => (
        <div
          key={color}
          className={`rocket-color rocket-color--${color}`}
          onClick={() => { getRocketColor(color); }}
        />
      ))
    );
  }

  render() {
    const { rocketColor } = this.props;
    return (
      <div className="game__settings">
        <div className="game__button-container">
          <BackButton buttonClass="button-container__back-menu" path="/" />
        </div>
        <div className="settings__wrapper">
          <div className="settings__music" />
          <div className="settings__sound" />
          <div className="settings__rocket-color">
            Выберите цвет ракеты
            <div className="rocket-color__palette">
              {this.generateRocketColors()}
            </div>
            <div className={`rocket-color__template ${rocketColor}`}>
              <SVGInline svg={rocketSVG} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  getRocketColor: PropTypes.func,
  rocketColor: PropTypes.string,
};

Settings.defaultProps = {
  getRocketColor: null,
  rocketColor: null,
};
