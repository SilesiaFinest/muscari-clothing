import React from "react";
import { withRouter } from "react-router-dom";
// using higher order component withRouter - it's wrapped around MenuItem in export default, now this component can access
// this.props.history, location and match (available only for the first-child of Router component) - avoiding props drilling

import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    // if there's size value('large') added on section item it's being passed by props and added as a className (and styled in css)
    className={`${size} menu-item`}
    // adding onClick which will redirect us by taking current url and adding target url to it making this routing 'aware'
    // of where it is and where to point (thanks to withRouter HOC)
    onClick={() => history.push(`${match.url}${linkUrl}`)}
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

export default withRouter(MenuItem);
