import React from "react";
import PropTypes from "prop-types";

export default function Planet({ planetClass, planetStyle }) {
  return (
    <div className={planetClass} style={planetStyle} />
  );
}

Planet.propTypes = {
  planetClass: PropTypes.string,
  planetStyle: PropTypes.objectOf(PropTypes.string),
};

Planet.defaultProps = {
  planetClass: null,
  planetStyle: null,
};
