import "dayjs/locale/ru";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const DateChooser = (props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Сбрасываем время до начала дня

  const shouldDisableDate = (date) => {
    return date < today;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={props.label}
          sx={{ ...props.sx }}
          value={props.value}
          onChange={props.onChange}
          shouldDisableDate={shouldDisableDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
