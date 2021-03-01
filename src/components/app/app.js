import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Intro from "../intro";
import Game from "../game";
import Stats from "../intro/stats";
import Settings from "../intro/settings";

export const lettersA = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];

export const lettersB = ["б", "в", "г", "д", "ж", "з", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ"];

export const wordsRate = [3, 4, 5];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      introClass: "intro",
      introTextClass: "active",
      menuClass: "",
      gameLetters: this.getLettersLevelInitState(),
      gameWords: this.getWordsLevelInitState(),
      rocketColor: "rocket-color--gray",
      soundVolume: 1,
      musicVolume: 0,
      numWords: 5,
    };
  }

  // listener click on Start Button to go to Main Menu from Intro
  onClickStartButton = () => {
    this.setState(
      {
        introTextClass: "",
        menuClass: "active",
      },
    );
  }

  // generate initial state for game Letters
  getLettersLevelInitState = () => {
    const arr = [];

    const countObj = {};
    lettersA.forEach((letterA) => {
      countObj[`${letterA}`] = 0;
    });

    lettersB.forEach((letterB) => {
      const obj = {
        symb: letterB,
        count: countObj,
        stars: 0,
      };
      arr.push(obj);
    });
    return arr;
  }

  // calculate stars for game Letters sublevels
  calculateNumStars = (countLetters) => {
    let sum = 0;
    let stars = 0;
    Object.keys(countLetters).forEach((letter) => {
      sum += parseInt(countLetters[letter], 10) > 2 ? 2 : parseInt(countLetters[letter], 10);
    });

    if (sum === 0) stars = 0;
    else if (sum > 0 && sum < 8) stars = 1;
    else if (sum < 15) stars = 2;
    else if (sum < 21) stars = 3;

    return stars;
  }

  // update game Letters state after playing
  onEndGame = (countLetters, letterB) => {
    const calcStars = this.calculateNumStars(countLetters);
    const obj = {
      symb: letterB,
      count: countLetters,
      stars: calcStars,
    };

    this.setState(({ gameLetters }) => {
      const newArr = gameLetters.slice();
      const ind = gameLetters.findIndex(el => el.symb === letterB);
      newArr[ind] = obj;
      return { gameLetters: newArr };
    });
  }

  // init Words Game state
  getWordsLevelInitState = () => {
    const arr = [];

    wordsRate.forEach((item) => {
      const obj = {
        num: item,
        correct: 0,
        error: 0,
        stars: 0,
      };
      arr.push(obj);
    });
    return arr;
  }

  calcWordStars = (sumCorrect) => {
    const { numWords } = this.state;
    const h = Math.round(numWords / 3);
    if (sumCorrect === 0) return 0;
    if (sumCorrect <= h) return 1;
    if (sumCorrect <= 2 * h) return 2;
    return 3;
  }

  onEndWordsGame = (n, gameArr) => {
    let sumCorrect = 0;
    let sumError = 0;

    gameArr.forEach((item) => {
      sumCorrect += item.correct;
      sumError += item.error;
    });

    const obj = {
      num: n,
      correct: sumCorrect,
      error: sumError,
      stars: this.calcWordStars(sumCorrect),
    };

    this.setState(({ gameWords }) => {
      const newArr = gameWords.slice();
      const ind = gameWords.findIndex(el => el.num === n);
      newArr[ind] = obj;
      return { gameWords: newArr };
    });
  }

  // get settings Rocket Color
  getRocketColor = (color) => {
    this.setState({ rocketColor: `rocket-color--${color}` });
  }

  // get changing sound and music volume
  onChangeVolume = (e) => {
    const volume = parseFloat(e.target.value, 10);
    this.setState({ [e.target.id]: volume });
    if (e.target.id === "musicVolume") {
      const music = document.querySelector(".musicVolume");
      music.muted = false;
      music.volume = volume;
    }
  }

  // get changing word number
  onChangeNumWords = (e) => {
    const num = parseInt(e.target.value, 10);
    this.setState({ numWords: num });
  }

  render() {
    const {
      introClass, introTextClass, menuClass, gameLetters,
      rocketColor, soundVolume, musicVolume, gameWords, numWords,
    } = this.state;

    return (
      <Router>
        <audio
          className="musicVolume"
          autoPlay
          loop
          muted
        >
          <source src="/src/assets/sounds/bg-audio.mp3" />
        </audio>
        <div className="game-container">
          <Switch>
            {/* first page with intro and menu */}
            <Route exact path="/">
              <Intro
                introClass={introClass}
                introTextClass={introTextClass}
                menuClass={menuClass}
                onClickStartButton={this.onClickStartButton}
              />
            </Route>
            {/* page with games */}
            <Route path="/game">
              <Game
                gameLetters={gameLetters}
                onEndGame={this.onEndGame}
                rocketColor={rocketColor}
                soundVolume={soundVolume}
                gameWords={gameWords}
                numWords={numWords}
                onEndWordsGame={this.onEndWordsGame}
              />
            </Route>
            {/* statistic page */}
            <Route path="/stats">
              <Stats gameLetters={gameLetters} />
            </Route>
            <Route path="/settings">
              <Settings
                getRocketColor={this.getRocketColor}
                rocketColor={rocketColor}
                onChangeSoundVolume={this.onChangeSoundVolume}
                soundVolume={soundVolume}
                musicVolume={musicVolume}
                onChangeVolume={this.onChangeVolume}
                numWords={numWords}
                onChangeNumWords={this.onChangeNumWords}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
