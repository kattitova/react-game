/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import rocketSVG from "../../../../assets/img/rocket-letters.svg";
import { lettersA } from "../../../app/app";
import PlaySound from "../../../play-sound";
import Planet from "./planet";

export function genPlanetImg() {
  const num = Math.floor(Math.random() * 6) + 1;
  const style = {
    background: `url("/src/assets/img/planets/${num}.png")`,
  };
  return style;
}

export default function Level1Sublevel({ onEndGame, rocketColor, soundVolume }) {
  const location = useLocation();
  const letterB = location.propsLetter;
  const wideLettersB = ["ж", "м", "ф", "ш", "щ"];
  const [letterA, setLetterA] = useState({ ind: 0, symb: lettersA[0] });
  const [nextLetterClass, setNextClass] = useState("next-letter");
  const [prevLetterClass, setPrevClass] = useState("prev-letter disabled");
  const [count, setCount] = useState({
    "а": 0, "е": 0, "ё": 0, "и": 0, "о": 0, "у": 0, "ы": 0, "э": 0, "ю": 0, "я": 0,
  });
  const [rocketClass, setRocketClass] = useState("rocket start");
  const [rocketStyle, setRocketStyle] = useState(null);
  const [planetStyle, setPlanetStyle] = useState(genPlanetImg());
  const rocketRef = useRef(null);

  // calc rocket flying path
  function calcArc(start, end, flag) {
    function calcCoord(a, b) {
      return a + b / 2;
    }

    function calcCenterCoord(a, b) {
      const min = a < b ? a : b;
      return Math.abs(a - b) * 0.75 + min;
    }

    const dx = flag === 2 ? -start.width / 4 : start.width / 4;
    const dy = flag === 2 ? 5 : 0;
    const X1 = calcCoord(start.left, start.width) - (window.innerWidth - start.width) / 2;
    const Y1 = calcCoord(start.top, start.height) - (window.innerHeight - start.height) / 2;
    const X3 = calcCoord(end.left, end.width) - (window.innerWidth - start.width) / 2 + dx;
    const Y3 = calcCoord(end.top, end.height) - (window.innerHeight - start.height) / 2 - dy;
    let X2;
    if (flag === 1) X2 = calcCenterCoord(X1, X3);
    else if (flag === 2) X2 = -window.innerWidth * 0.75;
    else X2 = window.innerWidth * 0.75;
    return `M ${X1},${Y1} Q ${X2},${Y3} ${X3},${Y3}`;
  }

  function onLetterAClick(e) {
    setCount(prevState => ({ ...prevState, [letterA.symb]: count[letterA.symb] + 1 }));
    const letter = e.target.getBoundingClientRect();
    const rocket = rocketRef.current.getBoundingClientRect();
    const rocketObj = {
      top: rocket.top,
      left: rocket.left,
      width: rocket.width,
      height: rocket.height,
    };
    const letterObj = {
      top: letter.top,
      left: letter.left,
      width: letter.width,
      height: letter.height,
    };
    let path;

    if (e.target.classList.contains("first")) {
      if (!rocketRef.current.classList.contains("on-first-letter")) {
        path = rocketRef.current.classList.contains("on-second-letter") ? calcArc(rocketObj, letterObj, 3) : calcArc(rocketObj, letterObj, 1);
      }
      setRocketClass("rocket on-first-letter");
      PlaySound(`${letterA.symb}${letterB}.mp3`, 1000, soundVolume);
    }
    if (e.target.classList.contains("second")) {
      path = calcArc(rocketObj, letterObj, 2);
      setRocketClass("rocket on-second-letter");
      PlaySound(`${letterB}${letterA.symb}.mp3`, 2000, soundVolume);
    }
    const style = {
      "offsetPath": `path("${path}")`,
    };
    setRocketStyle(style);
  }

  function changeLetterA(i) {
    setLetterA({ ind: letterA.ind + i, symb: lettersA[letterA.ind + i] });
    setRocketClass("rocket start");
    setPlanetStyle(genPlanetImg());
  }

  return (
    <div className="level-1__letters">
      {/* bottom A letter */}
      <div
        className="planet__letterA first"
        onClick={(e) => { onLetterAClick(e); }}
      >
        {letterA.symb}
      </div>

      {/* top A letter */}
      <div
        className="planet__letterA second"
        onClick={(e) => { onLetterAClick(e); }}
      >
        {letterA.symb}
      </div>

      {/* rocket */}
      <div className={`${rocketClass} ${rocketColor}`} style={rocketStyle} ref={rocketRef}>
        <div
          className={!wideLettersB.includes(letterB) ? "rocket__letterB" : "rocket__letterB wide"}
        >
          {letterB}
        </div>
        <SVGInline svg={rocketSVG} />
      </div>

      <Planet planetClass="planet planet--top" planetStyle={planetStyle} />
      <Planet planetClass="planet planet--bottom" planetStyle={planetStyle} />

      {/* button change on previouse letter */}
      <button
        type="button"
        className={prevLetterClass}
        onClick={() => {
          changeLetterA(-1);
          setNextClass("next-letter");
          if (letterA.ind < 2) setPrevClass(`${prevLetterClass} disabled`);
        }}
      >
        {lettersA[letterA.ind - 1]}
      </button>

      {/* button ending game and send state with sublevel results */}
      <Link
        className="close-game"
        to="/game/level-1"
        onClick={() => { onEndGame(count, letterB); }}
      >
        Закончить игру
      </Link>

      {/* button change on next letter */}
      <button
        type="button"
        className={nextLetterClass}
        onClick={() => {
          changeLetterA(1);
          setPrevClass("prev-letter");
          if (letterA.ind > 7) setNextClass(`${nextLetterClass} disabled`);
        }}
      >
        {lettersA[letterA.ind + 1]}
      </button>
    </div>
  );
}

Level1Sublevel.propTypes = {
  onEndGame: PropTypes.func,
  rocketColor: PropTypes.string,
  soundVolume: PropTypes.number,
};

Level1Sublevel.defaultProps = {
  onEndGame: null,
  rocketColor: null,
  soundVolume: null,
};
