import React from "react";

import { CustomButtonContainer } from "./custom-button-styles";

// conditionally render classNames because of props passed in
const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);
export default CustomButton;
