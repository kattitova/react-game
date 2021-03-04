import React from "react";
import SVGInline from "react-svg-inline";
import starSVG from "../../../assets/img/star.svg";

export default function GetStars() {
  const stars = [1, 2, 3];
  return (
    <div className="sub-level__stars">
      {stars.map(star => <div key={`star-${star}`} className="sub-level__star"><SVGInline svg={starSVG} /></div>)}
    </div>
  );
}
