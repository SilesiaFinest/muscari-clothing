import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// WithSpinner is a HigherOrderComponent - its a function that takes a component
// 'WrappedComponent' and passes it into the new component - Spinner wrapped
// around it. Depends on isLoading prop, otherProps are passed to the component
const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
