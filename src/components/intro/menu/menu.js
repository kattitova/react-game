import React, { Component } from "react";

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
    const { menuClass } = this.props;
    const setClass = `intro__menu ${menuClass}`;

    const menuItems = this.menuItemsData.map(item => (
      <button type="button" key={item.name} className={item.name}>{item.title}</button>
    ));

    return (
      <div className={setClass.trim()}>
        { menuItems }
      </div>
    );
  }
}
