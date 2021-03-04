import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        Разработчик
        <a href="https://github.com/kattitova" target="blank">Катерина Титова</a>
      </div>
      <div>
        <a className="rs-link" href="https://rs.school/react/" target="blank">
          <img src="./src/assets/img/rs-logo.png" />
        RS School React
        </a>
      </div>
    </div>
  );
}
