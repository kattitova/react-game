/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import BackButton from "../back-button";
import Level1Sublevel from "./level-1-sublevel";
import { lettersB } from "../../app/app";
import GetStars from "../get-stars";

export default class GameLevel1 extends Component {
  stars = [1, 2, 3];

  // get nuber of stars for all sub-levels from state
  getStars = (letterB) => {
    const { gameLetters } = this.props;
    return gameLetters.filter(el => el.symb === letterB)[0].stars;
  }

  getSubLevel = () => (
    lettersB.map((item, ind) => (
      <Link
        key={`letter-${ind}`}
        to={{
          pathname: "/game/level-1/letters",
          propsLetter: item,
        }}
      >
        <div className={`level-1__sub-level numStars-${this.getStars(item)}`} data-letter={`letter-${ind}`}>
          <span>{item}</span>
          <GetStars />
        </div>
      </Link>
    ))
  )

  render() {
    const { onEndGame, rocketColor, soundVolume } = this.props;

    return (
      <div className="game__level-1">
        <div className="game__button-container">
          <BackButton buttonClass="button-container__back-menu" path="/" />
          <BackButton buttonClass="button-container__back-game" path="/game" />
        </div>
        <div className="level-1__sub-levels-container">
          {this.getSubLevel()}
        </div>
        <Switch>
          <Route path="/game/level-1/letters">
            <Level1Sublevel
              onEndGame={onEndGame}
              rocketColor={rocketColor}
              soundVolume={soundVolume} 
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

GameLevel1.propTypes = {
  gameLetters: PropTypes.arrayOf(PropTypes.object),
  onEndGame: PropTypes.func,
  rocketColor: PropTypes.string,
  soundVolume: PropTypes.number,
};

GameLevel1.defaultProps = {
  gameLetters: null,
  onEndGame: null,
  rocketColor: null,
  soundVolume: null,
};
