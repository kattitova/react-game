/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SVGInline from "react-svg-inline";
import rocketSVG from "../../../../assets/img/rocket-letters.svg";

export default function Level1Sublevel({ text, onEndGame }) {
  const location = useLocation();
  const letterB = location.propsLetter;
  const lettersA = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];
  const wideLettersB = ["ж", "м", "ф", "ш", "щ"];
  const [letterA, setLetterA] = useState({ ind: 0, symb: lettersA[0] });
  const [nextLetterClass, setNextClass] = useState("next-letter");
  const [prevLetterClass, setPrevClass] = useState("prev-letter disabled");
  const [count, setCount] = useState({
    "а": 0, "е": 0, "ё": 0, "и": 0, "о": 0, "у": 0, "ы": 0, "э": 0, "ю": 0, "я": 0, 
  });

  return (
    <div className="level-1__letters">
      <div className="letters__container">
        {text}
      </div>

      <div
        className="planet__letterA first"
        onClick={() => {
          setCount(prevState => ({ ...prevState, [letterA.symb]: count[letterA.symb] + 1 }));
        }}
      >
        {letterA.symb}
      </div>
      <div
        className="planet__letterA second"
        onClick={() => {
          setCount(prevState => ({ ...prevState, [letterA.symb]: count[letterA.symb] + 1 }));
        }}
      >
        {letterA.symb}
      </div>

      <div className="rocket start">
        <div
          className={!wideLettersB.includes(letterB) ? "rocket__letterB" : "rocket__letterB wide"}
        >
          {letterB}
        </div>
        <SVGInline svg={rocketSVG} />
      </div>

      <button
        type="button"
        className={prevLetterClass}
        onClick={() => {
          setLetterA({ ind: letterA.ind - 1, symb: lettersA[letterA.ind - 1] });
          setNextClass("next-letter");
          if (letterA.ind < 2) setPrevClass(`${prevLetterClass} disabled`);
        }}
      >
        {lettersA[letterA.ind - 1]}
      </button>

      <Link className="close-game" to="/game/level-1" onClick={() => { onEndGame(count, letterB); }}>END GAME</Link>

      <button
        type="button"
        className={nextLetterClass}
        onClick={() => {
          setLetterA({ ind: letterA.ind + 1, symb: lettersA[letterA.ind + 1] });
          setPrevClass("prev-letter");
          if (letterA.ind > 7) setNextClass(`${nextLetterClass} disabled`);
        }}
      >
        {lettersA[letterA.ind + 1]}
      </button>
    </div>
  );
}
