import React from "react";

import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size }) => (
  <div
    // if there's size value('large') added on section item it's being passed by props and added as a className (and styled in css)
    className={`${size} menu-item`}
  >
    <div
      className="background-image"
      style={{
        // using style property by passing object with key == css value and value == url using JS template strings
        // this allows us to dynamically set styles on the components
        // this is created as separate div for css effect, it's not wrapped around content so only bcgr-photo will be transformed
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default MenuItem;
