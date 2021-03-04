/* eslint-disable no-param-reassign */
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
import ModalWindow from "./modal-window";

export default function Level2Sublevel({
  numWords, rocketColor, soundVolume, onEndWordsGame,
}) {
  const location = useLocation();
  const num = location.propsWord === undefined ? localStorage.getItem("numLettersGameWords") : location.propsWord;
  localStorage.setItem("numLettersGameWords", num);

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  const getWordsArray = () => {
    if (location.propsWord === undefined) return JSON.parse(localStorage.getItem("saveGameArr"));

    const words = wordsJSON.filter(el => el.num === num)[0];
    const startArr = [];
    for (let i = 0; i < words.mas.length; i += 1) {
      startArr[i] = i;
    }
    shuffle(startArr);

    const gameArr = [];
    for (let i = 0; i < numWords; i += 1) {
      gameArr.push(words.mas[startArr[i]]);
    }

    gameArr.forEach((item) => {
      item.correct = 0;
      item.error = 0;
    });

    localStorage.setItem("saveGameArr", JSON.stringify(gameArr));

    return gameArr;
  };

  const [gameArr, setGameArr] = useState(() => getWordsArray());
  // const [saveGameArr, setSaveGameArr] = useState(gameArr);
  const [gameWord, setGameWord] = useState({ ind: 0, obj: gameArr[0] });
  const [rocketClass, setRocketClass] = useState("rocket rocket--words");
  const [guessState, setGuessState] = useState(gameWord.obj.template);
  const [activeInd, setActiveInd] = useState(null);
  const [nextWordClass, setNextWordClass] = useState("next-word");
  const [prevWordClass, setPrevWordClass] = useState("prev-word disabled");
  const [autoPlay, setAutoPlay] = useState(false);
  const [classModalWindow, setClassModalWindow] = useState("modal-window hidden");
  const [sumCorrect, setSumCorrect] = useState(0);
  const [sumError, setSumError] = useState(0);

  const getInitClassLetterState = () => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
      arr[i] = "guess__letter";
    }
    return arr;
  };
  const [activeLetter, setActiveLetter] = useState(getInitClassLetterState());

  const onGuessLetterClick = (ind) => {
    const arr = [...activeLetter].map((_item, i) => {
      if (i < 2) return "guess__letter disable";
      return i === ind ? "guess__letter active" : "guess__letter";
    });
    setActiveLetter(arr);
    setActiveInd(ind);
  };

  const onSomeLetterClick = (ind, data) => {
    const arr = [...guessState];
    arr[ind] = data;
    setGuessState(arr);
  };

  // call functions with 0 volume for preload sounds
  PlaySound("correct.mp3", 0, 0);
  PlaySound("error.mp3", 0, 0);

  // reset letters "active" class
  const resetActiveClass = () => {
    const classArr = [];
    for (let i = 0; i < num; i += 1) {
      classArr[i] = "guess__letter";
    }
    setActiveLetter(classArr);
    setActiveInd(null);
  };

  // check guess word correct or not
  const checkCorrectWord = () => {
    if (!guessState.includes("")) {
      const cloneArr = gameArr.slice();
      const ind = cloneArr.findIndex(el => el.word === gameWord.obj.word);
      // const saveArr = saveGameArr.slice();

      // if word guesses correct increment correct answers
      if (gameWord.obj.word === guessState.join("")) {
        PlaySound("correct.mp3", 0, soundVolume);
        PlaySound(`${gameWord.obj.word}.mp3`, 0, soundVolume);
        setTimeout(() => { resetActiveClass(); }, 750);
        cloneArr[ind].correct += 1;
        setSumCorrect(sumCorrect + 1);

        // saveArr[ind].template = saveArr[ind].word.split("");

        // if guess all words -> show game end modal window
        if (sumCorrect + 1 === numWords) setClassModalWindow("modal-window");
      } else {
        // if word guesses incorrect increment error answers
        PlaySound("error.mp3", 0, soundVolume);
        const arr = [...guessState];
        for (let i = 2; i < num; i += 1) {
          arr[i] = "";
        }
        setTimeout(() => {
          setGuessState(arr);
          resetActiveClass();
        }, 750);
        cloneArr[ind].error += 1;
        setSumError(sumError + 1);
      }
      setGameArr(cloneArr);
      // setSaveGameArr(saveArr);
      // localStorage.setItem("saveGameArr", JSON.stringify(saveArr));
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
        onClick={(e) => {
          const indx = parseInt(e.target.getAttribute("data-num"), 10);
          onGuessLetterClick(indx);
        }}
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
  const [imgPlanet, setImgPlanet] = useState(genInitImgPlanetState());

  // render some letters for select
  const renderSomeLetters = (mas, cls) => mas.map((letter, ind) => (
    <div
      key={`some-letter-${letter}`}
      data-letter={letter}
      className={cls}
      style={imgPlanet[ind]}
      onClick={(e) => {
        const data = e.target.getAttribute("data-letter");
        onSomeLetterClick(activeInd, data);
      }}
    >
      {letter}
    </div>
  ));

  // refresh word: set empty guess letters and reset letters "active" class
  const refreshWord = () => {
    const arr = [...guessState];
    for (let i = 2; i < num; i += 1) {
      arr[i] = "";
    }
    setGuessState(arr);
    resetActiveClass();
  };

  // autoplay game
  useEffect(() => {
    if (autoPlay) {
      if (activeInd < num) {
        const resArr = gameWord.obj.word.split("");
        onGuessLetterClick(activeInd);
        onSomeLetterClick(activeInd, resArr[activeInd]);
        setActiveInd(activeInd + 1);
        setAutoPlay(false);
      }
    } else if (activeInd !== null && activeInd < num) {
      setTimeout(() => { setAutoPlay(true); }, 1000);
    }
  }, [autoPlay]);

  // change word by click on Next / Prev Button
  const changeWord = (i) => {
    setGameWord({ ind: gameWord.ind + i, obj: gameArr[gameWord.ind + i] });
    setGuessState(gameArr[gameWord.ind + i].template);
    setImgPlanet(genInitImgPlanetState());
    setRocketClass("rocket rocket--words start");
    setTimeout(() => { setRocketClass("rocket rocket--words"); }, 100);
    setPrevWordClass("prev-word");
    setNextWordClass("next-word");
  };

  const onCloseModal = () => {
    setClassModalWindow("modal-window hidden");
    onEndWordsGame(num, gameArr);
  };

  return (
    <div className="level-2__words">
      <div className={classModalWindow}>
        <ModalWindow
          sumCorrect={sumCorrect}
          sumError={sumError}
          numWords={numWords}
          onCloseModal={() => onCloseModal()}
        />
      </div>
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
            onClick={() => { onEndWordsGame(num, gameArr); }}
          >
              Закончить игру
          </Link>

          {/* button change on previuos word */}
          <button
            type="button"
            className={prevWordClass}
            onClick={() => {
              changeWord(-1);
              if (gameWord.ind < 2) setPrevWordClass(`${prevWordClass} disabled`);
            }}
          >
            Назад
          </button>

          {/* button refresh word */}
          {/* <button
            type="button"
            className="refresh-word"
            onClick={() => {
              refreshWord();
            }}
          >
            <i className="fas fa-sync-alt" />
          </button> */}

          {/* button change on next word */}
          <button
            type="button"
            className={nextWordClass}
            onClick={() => {
              changeWord(1);
              if (gameWord.ind > gameArr.length - 3) setNextWordClass(`${nextWordClass} disabled`);
            }}
          >
            Далее
          </button>

          {/* button autoplay */}
          <button
            type="button"
            className="autoplay-word"
            onClick={() => {
              refreshWord();
              setTimeout(() => {
                setActiveInd(2);
                setAutoPlay(true);
              }, 500);
            }}
          >
            <i className="fas fa-gamepad" />
          </button>
        </div>
      </div>
    </div>
  );
}

Level2Sublevel.propTypes = {
  numWords: PropTypes.number,
  rocketColor: PropTypes.string,
  soundVolume: PropTypes.number,
  onEndWordsGame: PropTypes.func,
};

Level2Sublevel.defaultProps = {
  numWords: null,
  rocketColor: null,
  soundVolume: null,
  onEndWordsGame: null,
};
