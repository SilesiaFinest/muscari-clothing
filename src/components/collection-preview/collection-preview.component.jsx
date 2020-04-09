import React from "react";

import "./collection-preview.styles.scss";

// destructuring props, using filter() to display only 4 items from each category
// !! this function is being called on every re-render, may cause performance issues! to be advised later!
const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
    </div>
  </div>
);

export default CollectionPreview;
