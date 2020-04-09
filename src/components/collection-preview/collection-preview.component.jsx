import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import "./collection-preview.styles.scss";

// destructuring props, using filter() to display only 4 items from each category
// !! this function is being called on every re-render, may cause performance issues! to be advised later!
const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map(({ id, ...otherItemProps }) => (
          // destructuring parameters and using ES6 spread operator to avoid passing key:values as MenuItem props like title={title}, size={size}
          <CollectionItem key={id} {...otherItemProps} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
