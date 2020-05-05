import { createSelector } from "reselect";

const selectDirMenu = (state) => state.dirMenu;

export const selectDirMenuSections = createSelector(
  [selectDirMenu],
  (directory) => directory.sections
);
