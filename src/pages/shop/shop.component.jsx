import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import { selectCollections } from "../../redux/shop/shop.selector";

const ShopPage = ({ collections }) => (
  // destructuring parameters and using ES6 spread operator in collections.map and using ...
  // to avoid passing key:values as CollectionPreview props like title={title}, routeName={routeName} etc.

  <div className="shop-page">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateTopProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateTopProps)(ShopPage);
