/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import {
  Route, Switch, Link, useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import rocketSVG from "../../assets/img/rocket-game.svg";
import pointerSVG from "../../assets/img/level-pointer.svg";
import GameLevel1 from "./game-level-1";
import GameLevel2 from "./game-level-2";
import BackButton from "./back-button";

export default function Game({
  gameLetters, onEndGame, rocketColor, soundVolume,
  gameWords, numWords, onEndWordsGame,
}) {
  // play New game or Continue game
  const location = useLocation();
  const [menuName, setMenuName] = useState(location.propsName);
  if (location.propsName === "new-game" || location.propsName === "continue-game") {
    if (location.propsName !== menuName) {
      setMenuName(location.propsName);
    }
  }

  let propsGameLetters = gameLetters;
  if (localStorage.getItem("gameLetters") !== null) {
    if (menuName === "continue-game") propsGameLetters = JSON.parse(localStorage.getItem("gameLetters"));
  }
  let propsGameWords = gameWords;
  if (localStorage.getItem("gameWords") !== null) {
    if (menuName === "continue-game") propsGameWords = JSON.parse(localStorage.getItem("gameWords"));
  }

  const gameLevels = [
    {
      name: "level-1", title: "Слоги", path: "/game/level-1", content: "Это тренировочная игра, в которой ты познакомишься со всеми звуками, путешествуя на ракете!",
    },
    {
      name: "level-2", title: "Слова", path: "/game/level-2", content: "В этой игре ты будешь собирать звезды-буквы и узнаешь, как читать слова",
    },
    // { name: "level-3", title: "Кроссворды", path: "/game/level-3" },
  ];

  const levels = gameLevels.map((item, ind) => (
    <Link
      key={item.name}
      className={`level-menu__item ${item.name}`}
      to={item.path}
    >
      <div className="level-menu__item--text">
        <div className="level-menu__item--title">{item.title}</div>
        <div className="level-menu__item--content">{item.content}</div>
      </div>
      <div className={`level-menu__item--pointer ${item.name}`}>
        <span className="pointer__name">{ind + 1}</span>
        <SVGInline svg={pointerSVG} />
      </div>
    </Link>
  ));

  return (
    <div className="game">
      <div className="game__button-container">
        <BackButton buttonClass="button-container__back-menu" path="/" />
      </div>
      <div className="game__level-menu">
        {/* rocket */}
        <div className={`rocket rocket-game ${rocketColor}`}>
          <SVGInline svg={rocketSVG} />
        </div>
        <div className="level-menu__wrapper">
          {levels}
        </div>
      </div>
      <Switch>
        <Route path="/game/level-1">
          <GameLevel1
            gameLetters={propsGameLetters}
            onEndGame={onEndGame}
            rocketColor={rocketColor}
            soundVolume={soundVolume}
          />
        </Route>
        <Route path="/game/level-2">
          <GameLevel2
            gameWords={propsGameWords}
            numWords={numWords}
            rocketColor={rocketColor}
            soundVolume={soundVolume}
            onEndWordsGame={onEndWordsGame}
          />
        </Route>
      </Switch>
    </div>
  );
  // }
}

Game.propTypes = {
  gameLetters: PropTypes.arrayOf(PropTypes.object),
  onEndGame: PropTypes.func,
  rocketColor: PropTypes.string,
  soundVolume: PropTypes.number,
  gameWords: PropTypes.arrayOf(PropTypes.object),
  numWords: PropTypes.number,
  onEndWordsGame: PropTypes.func,
};

Game.defaultProps = {
  gameLetters: null,
  onEndGame: null,
  rocketColor: null,
  soundVolume: null,
  gameWords: null,
  numWords: null,
  onEndWordsGame: null,
};
