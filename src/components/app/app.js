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
import PlaySound from "../play-sound";

export const lettersA = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];

export const lettersB = ["б", "в", "г", "д", "ж", "з", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ"];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      introClass: "intro",
      introTextClass: "active",
      menuClass: "",
      gameLetters: this.getLettersLevelInitState(),
      rocketColor: "rocket-color--gray",
      soundVolume: 1,
      musicVolume: 0,
    };
    this.musicRef = React.createRef();
  }

  // componentDidMount() {
  //   const { musicVolume } = this.state;
  //   //this.musicRef.current.volume = 0.5;
  //   document.querySelector(".musicVolume").volume = 0.5;
  //   console.log(document.querySelector(".musicVolume"));
  // }

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

  // get settings Rocket Color
  getRocketColor = (color) => {
    this.setState({ rocketColor: `rocket-color--${color}` });
  }

  // get changing sound and music volume
  onChangeVolume = (e) => {
    const volume = parseFloat(e.target.value, 10);
    this.setState({ [e.target.id]: volume });
    if (e.target.id === "musicVolume") {
      // this.musicRef.current.muted = false;
      const music = document.querySelector(".musicVolume");
      // this.musicRef.current.volume = volume;
      music.muted = false;
      music.volume = volume;
      console.log(this.musicRef.current.muted);
    }
  }

  render() {
    const {
      introClass, introTextClass, menuClass, gameLetters, rocketColor, soundVolume, musicVolume,
    } = this.state;

    return (
      <Router>
        <audio
          ref={this.musicRef}
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
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
