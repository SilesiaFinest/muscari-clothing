import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirMenuSections } from "../../redux/dir-menu/dir-menu.selector";

import MenuItem from "../menu-item/menu-item.component";

import "./dir-menu.styles.scss";

const DirMenu = ({ sections }) => (
  <div className="dir-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      // destructuring parameters and using ES6 spread operator to avoid passing key:values as MenuItem props like title={title}, size={size}
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirMenuSections,
});

export default connect(mapStateToProps)(DirMenu);
