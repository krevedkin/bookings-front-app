import React from "react";
import ReactPhoneInput from "react-phone-input-material-ui";
import { TextField } from "@mui/material";

const PhoneInput = (props) => {
  return (
    <ReactPhoneInput
      {...props}
      component={TextField}
      inputProps={{ helperText: props.helperText }}
    />
  );
};

export default PhoneInput;
