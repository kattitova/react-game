import React from "react";

export default function HotKeysPanel() {
  return (
    <div className="hotkeys-panel">
      <div className="hotkeys-panel__title">Управление клавиатурой</div>
      <div>
        <i>Z</i>
        закончить игру
      </div>
      <div>
        <i className="fas fa-long-arrow-alt-right" />
        следующая буква
      </div>
      <div>
        <i className="fas fa-long-arrow-alt-left" />
        предыдущая буква
      </div>
      <div>
        <i className="fas fa-long-arrow-alt-left" />
        лететь вниз
      </div>
      <div>
        <i className="fas fa-long-arrow-alt-up" />
        лететь вверх
      </div>
    </div>
  );
}
