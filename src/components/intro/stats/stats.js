/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
import React, { Component } from "react";
import PropTypes from "prop-types";
import BackButton from "../../game/back-button";
import { lettersA } from "../../app/app";

export default class Stats extends Component {
  // generate Letters Game Stats Table titles
  getLettersGameDataTitle = () => lettersA.map(letterA => <div key={`stats-${letterA}`} className="table__letters--title">{letterA}</div>)

  // generate Letters Game Stats Table data
  getLettersGameData = () => {
    const { gameLetters } = this.props;
    return gameLetters.map(i => Object.keys(i).map((val, ind) => {
      if (val === "stars") return;
      if (typeof i[val] !== "object") return (<div key={`${val}-${ind}`} className="table__letters--title">{i[val]}</div>);
      return Object.keys(i[val]).map(subval => (<div key={`${subval}-${ind}`}>{i[val][subval]}</div>));
    }));
  }

  render() {
    return (
      <div className="game__stats">
        <div className="game__button-container">
          <BackButton buttonClass="button-container__back-menu" path="/" />
        </div>
        <div className="stats__table">
          <div className="table__letters">
            <div className="table__letters--game-title">Игра Слоги</div>
            <div className="table__letters--title">Буква</div>
            { this.getLettersGameDataTitle() }
            { this.getLettersGameData() }
          </div>
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
  gameLetters: PropTypes.arrayOf(PropTypes.object),
};

Stats.defaultProps = {
  gameLetters: null,
};
