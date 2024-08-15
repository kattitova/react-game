import React from "react";
import PropTypes from "prop-types";

export default function Planet({ planetClass, planetStyle, children }) {
  return (
    <div className={planetClass} style={planetStyle}>
      {children}
    </div>
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
