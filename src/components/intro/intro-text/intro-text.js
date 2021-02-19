import React, { Component } from "react";

export default class IntroText extends Component {
  render() {
    const { textClass, onClickStartButton } = this.props;
    const setClass = `intro__text ${textClass}`;

    return (
      <div className={setClass.trim()}>
        <span className="intro__text--string">Добро пожаловать</span>
        <span className="intro__text--string">в Галактику Читанию</span>
        <button
          type="button"
          className="intro__text--button"
          onClick={onClickStartButton}
        >
          Старт
        </button>
      </div>
    );
  }
}
