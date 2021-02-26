/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import GameLevel1 from "./game-level-1";
import GameLevel2 from "./game-level-2";
import BackButton from "./back-button";

export default class Game extends Component {
  gameLevels = [
    { name: "level-1", title: "Слоги", path: "/game/level-1" },
    { name: "level-2", title: "Слова", path: "/game/level-2" },
    { name: "level-3", title: "Кроссворды", path: "/game/level-3" },
  ];

  render() {
    const levels = this.gameLevels.map(item => (
      <Link
        key={item.name}
        className={`level-menu__item ${item.name}`}
        to={item.path}
      >
        <span>{item.title}</span>
      </Link>
    ));

    const {
      gameLetters, onEndGame, rocketColor, soundVolume, gameWords, numWords,
    } = this.props;

    return (
      <div className="game">
        <div className="game__button-container">
          <BackButton buttonClass="button-container__back-menu" path="/" />
        </div>
        <div className="game__level-menu">
          {levels}
        </div>
        <Switch>
          <Route path="/game/level-1">
            <GameLevel1
              gameLetters={gameLetters}
              onEndGame={onEndGame}
              rocketColor={rocketColor}
              soundVolume={soundVolume}
            />
          </Route>
          <Route path="/game/level-2">
            <GameLevel2
              gameWords={gameWords}
              numWords={numWords}
              rocketColor={rocketColor}
              soundVolume={soundVolume}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

Game.propTypes = {
  gameLetters: PropTypes.arrayOf(PropTypes.object),
  onEndGame: PropTypes.func,
  rocketColor: PropTypes.string,
  soundVolume: PropTypes.number,
  gameWords: PropTypes.arrayOf(PropTypes.object),
  numWords: PropTypes.number,
};

Game.defaultProps = {
  gameLetters: null,
  onEndGame: null,
  rocketColor: null,
  soundVolume: null,
  gameWords: null,
  numWords: null,
};
