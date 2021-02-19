/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import starSVG from "../../../assets/img/star.svg";
import BackButton from "../back-button";
import Level1Sublevel from "./level-1-sublevel";

export default class GameLevel1 extends Component {
  lettersA = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];

  lettersB = ["б", "в", "г", "д", "ж", "з", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ"];

  stars = [1, 2, 3];

  getSubLevel = () => this.lettersB.map((item, ind) => (
    <Link
      key={`letter-${ind}`}
      to={{
        pathname: "/game/level-1/letters",
        propsLetter: item,
      }}
    >
      <div className="level-1__sub-level" data-letter={`letter-${ind}`}>
        <span>{item}</span>
        <div className="sub-level__stars">
          {this.stars.map(star => <div key={`star-${star}`} className="sub-level__star"><SVGInline svg={starSVG} /></div>)}
        </div>
      </div>
    </Link>
  ))

  render() {
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
            <Level1Sublevel text="Text" />
          </Route>
        </Switch>
      </div>
    );
  }
}

GameLevel1.propTypes = {
  levelClass: PropTypes.string,
  onBackToMenu: PropTypes.func,
};

GameLevel1.defaultProps = {
  levelClass: null,
  onBackToMenu: null,
};
