import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class BackButton extends Component {
  render() {
    const { buttonClass, path } = this.props;
    return (
      <Link className={buttonClass} to={path} />
    );
  }
}

BackButton.propTypes = {
  buttonClass: PropTypes.string,
  path: PropTypes.string,
};

BackButton.defaultProps = {
  buttonClass: null,
  path: null,
};
