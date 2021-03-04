/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import rocketSVG from "../../../assets/img/rocket-letters.svg";
import BackButton from "../../game/back-button";
import InputRange from "./input-range";

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
    const {
      rocketColor, soundVolume, musicVolume, onChangeVolume,
      numWords, onChangeNumWords,
    } = this.props;
    return (
      <div className="game__settings">
        <div className="game__button-container">
          <BackButton buttonClass="button-container__back-menu" path="/" />
        </div>
        <div className="settings__wrapper">
          <div className="settings__sound--wrapper">
            {/* Sound settings */}
            <div className="settings__sound">
              <InputRange
                inputLabel="Звуки"
                inputId="soundVolume"
                volume={soundVolume}
                onChangeVolume={onChangeVolume}
              />
            </div>

            {/* Background audio settings */}
            <div className="settings__music">
              <InputRange
                inputLabel="Музыка"
                inputId="musicVolume"
                volume={musicVolume}
                onChangeVolume={onChangeVolume}
              />
            </div>
          </div>

          {/* Words game time */}
          <div className="settings__game-time">
            <div className="input-range">
              Продолжительность игры Слова (количество слов)
              <input
                type="range"
                id="numWords"
                className="numWords"
                list="numWords__list"
                min="3"
                max="9"
                step="1"
                value={numWords}
                onChange={(e) => { onChangeNumWords(e); }}
              />
              <datalist id="numWords__list">
                <option value="3" label="3" />
                <option value="4" label="4" />
                <option value="5" label="5" />
                <option value="6" label="6" />
                <option value="7" label="7" />
                <option value="8" label="8" />
                <option value="9" label="9" />
              </datalist>
            </div>
          </div>

          {/* Rocket color settings */}
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
  onChangeVolume: PropTypes.func,
  soundVolume: PropTypes.number,
  musicVolume: PropTypes.number,
  numWords: PropTypes.number,
  onChangeNumWords: PropTypes.func,
};

Settings.defaultProps = {
  getRocketColor: null,
  rocketColor: null,
  onChangeVolume: null,
  soundVolume: null,
  musicVolume: null,
  numWords: null,
  onChangeNumWords: null,
};
