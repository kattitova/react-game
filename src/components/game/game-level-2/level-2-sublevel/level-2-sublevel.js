/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import rocketSVG from "../../../../assets/img/rocket-words.svg";
import wordsJSON from "../game-level-2.json";
import { genPlanetImg } from "../../game-level-1/level-1-sublevel/level-1-sublevel";
import PlaySound from "../../../play-sound";

export default function Level2Sublevel({ numWords, rocketColor, soundVolume }) {
  const location = useLocation();
  const num = location.propsWord;
  const words = wordsJSON.filter(el => el.num === num)[0];

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  const getWordsArray = () => {
    const startArr = [];
    for (let i = 0; i < words.mas.length; i += 1) {
      startArr[i] = i;
    }
    shuffle(startArr);

    const gameArr = [];

    for (let i = 0; i < numWords; i += 1) {
      gameArr.push(words.mas[startArr[i]]);
    }
    return gameArr;
  };

  const gameArr = getWordsArray();
  const [gameWord, setGameWord] = useState({ ind: 0, obj: gameArr[0] }); // use for slide next / prev word
  const [rocketClass, setRocketClass] = useState("rocket rocket--words");
  const [guessState, setGuessState] = useState(gameWord.obj.template);
  const [activeInd, setActiveInd] = useState(null);

  const getInitClassLetterState = () => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
      arr[i] = "guess__letter";
    }
    return arr;
  };
  const [activeLetter, setActiveLetter] = useState(getInitClassLetterState());

  const onGuessLetterClick = (e) => {
    const ind = parseInt(e.target.getAttribute("data-num"), 10);
    const arr = [...activeLetter].map((item, i) => {
      if (i < 2) return "guess__letter disable";
      return i === ind ? "guess__letter active" : "guess__letter";
    });
    setActiveLetter(arr);
    setActiveInd(ind);
  };

  const onSomeLetterClick = (e) => {
    const arr = [...guessState];
    arr[activeInd] = e.target.getAttribute("data-letter");
    setGuessState(arr);
  };

  // call functions with 0 volume for preload sounds
  PlaySound("correct.mp3", 0, 0);
  PlaySound("error.mp3", 0, 0);

  // check guess word correct or not
  const checkCorrectWord = async () => {
    if (!guessState.includes("")) {
      if (gameWord.obj.word === guessState.join("")) {
        PlaySound("correct.mp3", 0, soundVolume);
      } else {
        await PlaySound("error.mp3", 0, soundVolume);
        const arr = [...guessState];
        for (let i = 2; i < num; i += 1) {
          arr[i] = "";
        }
        setTimeout(() => { setGuessState(arr); }, 750);
      }
    }
  };

  // call function checkCorrectWord when state change
  useEffect(() => {
    checkCorrectWord();
  }, [guessState]);

  // render word for guess
  const renderGuessLetters = mas => mas.map((letter, ind) => {
    if (letter !== "") {
      return <div key={`guess-letter-${letter}`} className="guess__letter disable">{letter}</div>;
    }
    return (
      <div
        key={`guess-letter-${ind}`}
        data-num={ind}
        className={activeLetter[ind]}
        onClick={e => onGuessLetterClick(e)}
      >
        {guessState[ind]}
      </div>
    );
  });

  const genInitImgPlanetState = () => {
    const styleArr = [];
    for (let i = 1; i <= gameWord.obj.some.length; i += 1) {
      styleArr.push(genPlanetImg());
    }
    return styleArr;
  };
  const [imgPlanet, setImgPlanet] = useState(genInitImgPlanetState()); // use when slide next / prev word

  // render some letters for select
  const renderSomeLetters = (mas, cls) => mas.map((letter, ind) => (
    <div
      key={`some-letter-${letter}`}
      data-letter={letter}
      className={cls}
      style={imgPlanet[ind]}
      onClick={e => onSomeLetterClick(e)}
    >
      {letter}
    </div>
  ));

  return (
    <div className="level-2__words">
      <div className="words__wrapper">
        <div className="words__sidebar">
          {/* rocket */}
          <div className={`${rocketClass} ${rocketColor}`}>
            <div className="rocket__img">
              <img alt="" src={gameWord.obj.img} />
            </div>
            <SVGInline svg={rocketSVG} />
          </div>
        </div>

        <div className="words__center">
          {/* word for guess */}
          <div className="center__guess">
            {renderGuessLetters(gameWord.obj.template)}
          </div>
          {/* some letters for select */}
          <div className="center__letters">
            {renderSomeLetters(gameWord.obj.some, "some__letter")}
          </div>
        </div>

        {/* navigation buttons block */}
        <div className="words__button">
          {/* button ending game and send state with sublevel results */}
          <Link
            className="close-game"
            to="/game/level-2"
            // onClick={() => { onEndGame(count, letterB); }}
          >
              Закончить игру
          </Link>
        </div>
      </div>
    </div>
  );
}

Level2Sublevel.propTypes = {
  numWords: PropTypes.number,
  rocketColor: PropTypes.string,
  soundVolume: PropTypes.number,
};

Level2Sublevel.defaultProps = {
  numWords: null,
  rocketColor: null,
  soundVolume: null,
};
