import { createSelector } from "reselect";

// COLLECTION ID MAP is an object that maps the string value to respective ID
// so that string value we get from the URL will be actual property
// we using that to get dynamic value of the property to get correct ID
const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// find collection.id matching the url parameter of COLLECTION_ID_MAP
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  );
