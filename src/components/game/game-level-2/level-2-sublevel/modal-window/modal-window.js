import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import GetStars from "../../../get-stars";

export default function ModalWindow({
  sumCorrect, sumError, numWords, onCloseModal,
}) {
  const getStars = () => {
    const h = Math.round(numWords / 3);
    if (sumCorrect === 0) return 0;
    if (sumCorrect <= h) return 1;
    if (sumCorrect <= 2 * h) return 2;
    return 3;
  };

  return (
    <div className="modal-window__wrapper">
      <div className={`modal-window__stars numStars-${getStars()}`}>
        <GetStars />
      </div>
      <div className="modal-window__title">
        уровень пройден
      </div>
      <div className="modal-window__info">
        <div>
          отгадано слов
          <span>{sumCorrect}</span>
        </div>
        <div>
          допущено ошибок
          <span>{sumError}</span>
        </div>
      </div>
      <Link
        className="close-modal"
        to="/game/level-2"
        onClick={onCloseModal}
      >
        Закрыть
      </Link>
    </div>
  );
}

ModalWindow.propTypes = {
  numWords: PropTypes.number,
  sumError: PropTypes.number,
  sumCorrect: PropTypes.number,
  onCloseModal: PropTypes.func,
};

ModalWindow.defaultProps = {
  numWords: null,
  sumError: null,
  sumCorrect: null,
  onCloseModal: null,
};
