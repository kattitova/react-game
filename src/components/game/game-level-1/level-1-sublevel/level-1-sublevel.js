import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../../back-button";

export default function Level1Sublevel({text}) {
  const location = useLocation();
  console.log(location);
  console.log(location.propsLetter);
  return (
    <div className="level-1__letters">
      <div className="game__button-container">
        <BackButton buttonClass="button-container__back-menu" path="/" />
        <BackButton buttonClass="button-container__back-game" path="/game/level-1" />
      </div>
      <div className="letters__container">
        {text}
      </div>
    </div>
  );
}
