import React from "react";
import "dayjs/locale/ru";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const DateChooser = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          {...props}
          disablePast
          sx={{ ...props.sx }}
          slotProps={{
            textField: {
              helperText: props.errorText,
              disabled: true,
              required: props.required,
              error: props.error,
              sx: { ...props.sx },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
