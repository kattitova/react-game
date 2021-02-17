import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Menu extends Component {
  menuItemsData = [
    { name: "new-game", title: "Новая игра" },
    { name: "continue-game", title: "Продолжить" },
    { name: "settings", title: "Настройки" },
    { name: "stats", title: "Статистика" },
    { name: "score", title: "Топ игр" },
    { name: "info", title: "Об игре" },
  ];

  render() {
    const { menuClass, onMenuItemClick } = this.props;
    const setClass = `intro__menu ${menuClass}`;

    const menuItems = this.menuItemsData.map(item => (
      <button
        type="button"
        key={item.name}
        className={item.name}
        onClick={() => { onMenuItemClick(item.name); }}
      >
        {item.title}
      </button>
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
  onMenuItemClick: PropTypes.func,
};

Menu.defaultProps = {
  menuClass: null,
  onMenuItemClick: null,
};
