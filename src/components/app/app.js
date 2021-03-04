/* eslint-disable no-param-reassign */
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
import wordsJSON from "../game/game-level-2/game-level-2.json";

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
      gameLettersStats: this.getLettersStatsInitState(),
      gameWords: this.getWordsLevelInitState(),
      gameWordsStats: this.getWordsStatsInitState(),
      rocketColor: "rocket-color--gray",
      soundVolume: 1,
      musicVolume: 0,
      numWords: 5,
      gameStatus: "new",
    };
    this.audioRef = React.createRef();
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
    if (localStorage.getItem("gameLetters") !== null) {
      return JSON.parse(localStorage.getItem("gameLetters"));
    }

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
      localStorage.setItem("gameLetters", JSON.stringify(newArr));
      this.updateLettersGameStats(newArr);
      return { gameLetters: newArr };
    });

    this.setState({ gameStatus: "continue" });
  }

  // generate initial state for game statistic Letters
  getLettersStatsInitState = () => {
    if (localStorage.getItem("gameLettersStats") !== null) {
      return JSON.parse(localStorage.getItem("gameLettersStats"));
    }
    return this.getLettersLevelInitState();
  }

  // update Letters Game Statistic
  updateLettersGameStats = (arr) => {
    this.setState({ gameLettersStats: arr });
    localStorage.setItem("gameLettersStats", JSON.stringify(arr));
  }

  // init Words Game state
  getWordsLevelInitState = () => {
    if (localStorage.getItem("gameWords") !== null) {
      return JSON.parse(localStorage.getItem("gameWords"));
    }

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

  // calculate stars for game Words sublevels
  calcWordStars = (sumCorrect) => {
    const { numWords } = this.state;
    const h = Math.round(numWords / 3);
    if (sumCorrect === 0) return 0;
    if (sumCorrect <= h) return 1;
    if (sumCorrect <= 2 * h) return 2;
    return 3;
  }

  // update game Words state after playing
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
      localStorage.setItem("gameWords", JSON.stringify(newArr));
      return { gameWords: newArr };
    });

    this.updateWordsGameStats(gameArr);
    this.setState({ gameStatus: "continue" });
  }

  // generate initial state for game statistic Words
  getWordsStatsInitState = () => {
    if (localStorage.getItem("gameWordsStats") !== null) {
      return JSON.parse(localStorage.getItem("gameWordsStats"));
    }

    const arr = [];
    wordsJSON.forEach((item) => {
      item.mas.forEach((i) => {
        arr.push(i);
      });
    });
    return arr;
  }

  // update Words Game Statistic
  updateWordsGameStats = (arr) => {
    const { gameWordsStats } = this.state;

    const newArr = [...gameWordsStats];
    arr.forEach((item) => {
      const ind = newArr.findIndex(el => el.word === item.word);
      newArr[ind].correct += item.correct;
      newArr[ind].error += item.error;
    });
    this.setState({ gameWordsStats: newArr });
    localStorage.setItem("gameWordsStats", JSON.stringify(newArr));
  }

  // set state gameStatus when click New-Game button
  onClickMenuButton = (item) => {
    if (item === "new-game") {
      this.setState({ gameStatus: "new" });
      localStorage.removeItem("gameWords");
      localStorage.removeItem("gameLetters");
      localStorage.removeItem("gameWordsStats");
      this.setState({ gameLetters: this.getLettersLevelInitState() });
      this.setState({ gameWords: this.getWordsLevelInitState() });
      this.setState(({ gameWordsStats }) => {
        const newArr = [...gameWordsStats];
        newArr.forEach((i) => {
          i.correct = 0;
          i.error = 0;
        });
        return { gameWordsStats: newArr };
      });
    }
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
      this.audioRef.current.src = "./src/assets/sounds/bg-audio.mp3";
      this.audioRef.current.load();
      this.audioRef.current.play();
      this.audioRef.current.volume = volume;
    }
  }

  // get changing word number
  onChangeNumWords = (e) => {
    const num = parseInt(e.target.value, 10);
    this.setState({ numWords: num });
  }

  render() {
    const {
      introClass, introTextClass, menuClass, gameLetters, gameStatus,
      rocketColor, soundVolume, musicVolume, gameWords, numWords,
      gameLettersStats, gameWordsStats,
    } = this.state;

    return (
      <Router>
        <audio
          ref={this.audioRef}
          className="musicVolume"
          autoPlay
          loop
        />
        <div className="game-container">
          <Switch>
            {/* first page with intro and menu */}
            <Route exact path="/">
              <Intro
                introClass={introClass}
                introTextClass={introTextClass}
                menuClass={menuClass}
                onClickStartButton={this.onClickStartButton}
                onClickMenuButton={this.onClickMenuButton}
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
                gameStatus={gameStatus}
              />
            </Route>
            {/* statistic page */}
            <Route path="/stats">
              <Stats
                gameLetters={gameLettersStats}
                gameWords={gameWordsStats}
              />
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
