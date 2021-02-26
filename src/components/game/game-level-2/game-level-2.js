import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import BackButton from "../back-button";
import { wordsRate } from "../../app/app";
import GetStars from "../get-stars";
import Level2Sublevel from "./level-2-sublevel";

export default class GameLevel2 extends Component {
  // get nuber of stars for all sub-levels from state
  getStars = (num) => {
    const { gameWords } = this.props;
    return gameWords.filter(el => el.num === num)[0].stars;
  }

  getSubLevel = () => (wordsRate.map(word => (
    <Link
      key={`${word}-letters`}
      to={{
        pathname: "/game/level-2/words",
        propsWord: word,
      }}
    >
      <div className={`level-2__sub-level numStars-${this.getStars(word)}`}>
        <GetStars />
        <div className="sub-level__title">
          <span>{word}</span>
              буквы
        </div>
      </div>
    </Link>
  )))

  render() {
    const { numWords, rocketColor, soundVolume } = this.props;
    return (
      <div className="game__level-2">
        <div className="game__button-container">
          <BackButton buttonClass="button-container__back-menu" path="/" />
          <BackButton buttonClass="button-container__back-game" path="/game" />
        </div>
        <div className="level-2__sub-levels-container">
          {this.getSubLevel()}
        </div>
        <Switch>
          <Route path="/game/level-2/words">
            <Level2Sublevel
              numWords={numWords}
              // onEndGame={onEndGame}
              rocketColor={rocketColor}
              soundVolume={soundVolume}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

GameLevel2.propTypes = {
  gameWords: PropTypes.arrayOf(PropTypes.object),
  numWords: PropTypes.number,
  rocketColor: PropTypes.string,
  soundVolume: PropTypes.number,
};

GameLevel2.defaultProps = {
  gameWords: null,
  numWords: null,
  rocketColor: null,
  soundVolume: null,
};
