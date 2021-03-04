import React from "react";
import PropTypes from "prop-types";

export default function InputRange({
  inputLabel, inputId, volume, onChangeVolume,
}) {
  return (
    <div className="input-range">
      {inputLabel}
      <input
        type="range"
        id={inputId}
        className={inputId}
        list="volume__list"
        min="0"
        max="1.0"
        step="0.25"
        value={volume}
        onChange={(e) => { onChangeVolume(e); }}
      />
      <datalist id="volume__list">
        <option value="0" label="выкл" />
        <option value="0.25" />
        <option value="0.5" label="50%" />
        <option value="0.75" />
        <option value="1.0" label="100%" />
      </datalist>
    </div>
  );
}
