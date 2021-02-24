import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Menu extends Component {
  menuItemsData = [
    { name: "new-game", title: "Новая игра", path: "/game" },
    { name: "continue-game", title: "Продолжить", path: "/game" },
    { name: "settings", title: "Настройки", path: "/settings" },
    { name: "stats", title: "Статистика", path: "/stats" },
    { name: "score", title: "Топ игр", path: "/score" },
    { name: "info", title: "Об игре", path: "/info" },
  ];

  render() {
    const { menuClass } = this.props;
    const setClass = `intro__menu ${menuClass}`;

    const menuItems = this.menuItemsData.map(item => (
      <Link
        key={item.name}
        className={item.name}
        to={item.path}
      >
        <span>{item.title}</span>
      </Link>
    ));

    return (
      <div className={setClass.trim()}>
        { menuItems }
      </div>
    );
  }
}

Menu.propTypes = {
  menuClass: PropTypes.string,
};

Menu.defaultProps = {
  menuClass: null,
};
