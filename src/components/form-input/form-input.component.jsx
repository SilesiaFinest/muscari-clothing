import React from "react";

import "./form-input.styles.scss";

// this is a custom component to make login labels go above input field when user start to type in them
// label and input will always be togeter as 'group' the rest is passed as otherProps

const FormInput = ({ handleChange, label, ...otherProps }) => (
  // it passed props.value != 0 add class 'shrink' to the label
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label `}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
