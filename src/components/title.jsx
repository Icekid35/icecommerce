import React from "react";
import "../styles/title.css";

export default function Title({name,link}) {
  return (
    <>
          <div className="bread-crumb">
              <div className="main-text">{name ?? "SHOP"}</div>
              <div className="sub-text">{link ?? "HOME / SHOP GRID 2 COLUMN"}</div>
      </div>
    </>
  );
}
