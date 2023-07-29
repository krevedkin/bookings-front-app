import React from "react";
import "dayjs/locale/ru";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme } from "@emotion/react";

export const DateChooser = (props) => {
  const theme = useTheme();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          {...props}
          disablePast
          slotProps={{
            textField: {
              helperText: props.errorText,
              disabled: true,
              required:true,
              error:props.error,
              sx: {
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: theme.palette.text.primary,
                },
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
