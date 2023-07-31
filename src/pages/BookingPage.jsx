import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  useAppBarStore,
  useBookingPageStore,
  useHomePageStore,
  useHotelPageStore,
} from "../store/store";
import { DateChooser } from "../components/DateChooser";
import ReactPhoneInput from "react-phone-input-material-ui";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useTheme } from "@emotion/react";
export const BookingPage = () => {
  const userName = useAppBarStore((state) => state.userName);

  const dateFromHomePage = useHomePageStore((state) => state.dateFrom);
  const dateToHomePage = useHomePageStore((state) => state.dateTo);

  const setSelectedDateFromHomePage = useHomePageStore(
    (state) => state.setSelectedDateFrom
  );

  const setSelectedDateToHomePage = useHomePageStore(
    (state) => state.setSelectedDateTo
  );

  const hotelData = useHotelPageStore((state) => state.hotelData);
  const getHotelData = useHotelPageStore((state) => state.getHotelData);

  const roomData = useBookingPageStore((state) => state.roomData);
  const getRoomData = useBookingPageStore((state) => state.getRoomData);
  const dateFrom = useBookingPageStore((state) => state.dateFrom);
  const setSelectedDateFrom = useBookingPageStore(
    (state) => state.setSelectedDateFrom
  );
  const dateTo = useBookingPageStore((state) => state.dateTo);
  const setSelectedDateTo = useBookingPageStore(
    (state) => state.setSelectedDateTo
  );

  const emailValue = useBookingPageStore((state) => state.emailValue);
  const setEmailValue = useBookingPageStore((state) => state.setEmailValue);
  const daysCount = useBookingPageStore((state) => state.daysCount);
  const setDaysCount = useBookingPageStore((state) => state.setDaysCount);
  const totalPrice = useBookingPageStore((state) => state.totalPrice);
  const setTotalPrice = useBookingPageStore((state) => state.setTotalPrice);
  const phoneValue = useBookingPageStore((state) => state.phoneValue);
  const setPhoneValue = useBookingPageStore((state) => state.setPhoneValue);

  const firstNameValue = useBookingPageStore((state) => state.firstNameValue);
  const setFirstNameValue = useBookingPageStore(
    (state) => state.setFirstNameValue
  );
  const lastNameValue = useBookingPageStore((state) => state.lastNameValue);
  const setLastNameValue = useBookingPageStore(
    (state) => state.setLastNameValue
  );

  const errorEmailValue = useBookingPageStore((state) => state.errorEmailValue);
  const setErrorEmailValue = useBookingPageStore(
    (state) => state.setErrorEmailValue
  );
  const errorPhoneValue = useBookingPageStore((state) => state.errorPhoneValue);
  const setErrorPhoneValue = useBookingPageStore(
    (state) => state.setErrorPhoneValue
  );
  const errorFirstNameValue = useBookingPageStore(
    (state) => state.errorFirstNameValue
  );
  const setErrorFirstNameValue = useBookingPageStore(
    (state) => state.setErrorFirstNameValue
  );
  const errorLastNameValue = useBookingPageStore(
    (state) => state.errorLastNameValue
  );
  const setErrorLastNameValue = useBookingPageStore(
    (state) => state.setErrorLastNameValue
  );

  const errorDateFrom = useBookingPageStore((state) => state.errorDateFrom);
  const setErrorDateFrom = useBookingPageStore(
    (state) => state.setErrorDateFrom
  );
  const errorDateTo = useBookingPageStore((state) => state.errorDateTo);
  const setErrorDateTo = useBookingPageStore((state) => state.setErrorDateTo);

  const addBooking = useBookingPageStore((state) => state.addBooking);
  const errorMessage = useBookingPageStore((state) => state.errorMessage);

  const setAlertOpen = useHomePageStore((state) => state.setAlertOpen);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRoomData(roomId);
      if (dateFromHomePage && dateToHomePage) {
        const days = (dateToHomePage - dateFromHomePage) / (1000 * 3600 * 24);
        setDaysCount(days);
        setTotalPrice(response.data.price * days);
      }

      await getHotelData(response?.data?.hotel_id);
      setEmailValue(userName);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const response = await addBooking();
      if (response?.status === 201) {
        navigate("/home");
        setAlertOpen(true);
      }
    }
  };

  useEffect(() => {
    if (dateFromHomePage && dateToHomePage) {
      setSelectedDateFrom(dateFromHomePage);
      setSelectedDateTo(dateToHomePage);
      setSelectedDateFromHomePage(null);
      setSelectedDateToHomePage(null);
    }
    if (dateFrom && dateTo) {
      const days = (dateTo - dateFrom) / (1000 * 3600 * 24);
      setDaysCount(days);
      setTotalPrice(roomData?.price * days);
    }
  }, [dateFrom, dateTo]);

  const validateForm = () => {
    if (!dateFrom) {
      setErrorDateFrom("Выберите дату заезда");
      return false;
    }

    if (!dateTo) {
      setErrorDateTo("Выберите дату выезда");
      return false;
    }

    if (firstNameValue.length === 0) {
      setErrorFirstNameValue("Введите имя");
      return false;
    }

    if (lastNameValue.length === 0) {
      setErrorLastNameValue("Введите фамилию");
      return false;
    }
    if (phoneValue.length !== 11) {
      setErrorPhoneValue("Введите корректный номер телефона");
      return false;
    }

    if (emailValue === "") {
      setErrorEmailValue("Введите email");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailValue)) {
      setErrorEmailValue("Введите корректный email");
      return false;
    }

    return true;
  };

  if (!roomData || !hotelData) {
    return <div>Loading...</div>;
  }
  return (
    <Container maxWidth={"sm"}>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component={"form"}
          sx={{ mt: 3, mb: 5 }}
          onSubmit={() => validateForm()}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h4">Бронирование</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <b>Отель: </b>
                {hotelData?.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <b>Номер: </b>
                {roomData.name}
              </Typography>
            </Grid>
            {errorMessage && (
              <Grid item xs={12}>
                <Typography color="error">{errorMessage}</Typography>
              </Grid>
            )}
          </Grid>
          <Grid container pt={2}>
            <Grid item sm={12}>
              <Typography>Выберите даты</Typography>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <DateChooser
                  label="Дата заезда"
                  value={dateFromHomePage ? dateFromHomePage : dateFrom}
                  onChange={setSelectedDateFrom}
                  onClose={() => setErrorDateFrom("")}
                  maxDate={dayjs(dateTo).subtract(1, "day")}
                  required
                  errorText={
                    Boolean(errorDateFrom)
                      ? errorDateFrom
                      : "выберите дату заезда"
                  }
                  error={Boolean(errorDateFrom)}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: theme.palette.text.primary,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DateChooser
                  label="Дата выезда"
                  value={dateToHomePage ? dateToHomePage : dateTo}
                  onChange={setSelectedDateTo}
                  onClose={() => setErrorDateTo("")}
                  minDate={dayjs(dateFrom).add(1, "day")}
                  errorText={
                    Boolean(errorDateTo) ? errorDateTo : "выберите дату выезда"
                  }
                  error={Boolean(errorDateTo)}
                  required
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: theme.palette.text.primary,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container pt={2} spacing={1}>
            <Grid item sm={12}>
              <Typography>Введите данные</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Имя"
                required
                placeholder="Иван"
                helperText={
                  Boolean(errorFirstNameValue)
                    ? errorFirstNameValue
                    : "Введите свое имя"
                }
                error={Boolean(errorFirstNameValue)}
                value={firstNameValue}
                onChange={(e) => {
                  setErrorFirstNameValue("");
                  const lettersOnlyRegex = /^[A-Za-zА-Яа-я]+$/;
                  if (
                    lettersOnlyRegex.test(e.target.value) ||
                    e.target.value.length === 0
                  ) {
                    setFirstNameValue(e.target.value);
                  }
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Фамилия"
                placeholder="Иванов"
                helperText={
                  Boolean(errorLastNameValue)
                    ? errorLastNameValue
                    : "Введите свою фамилию"
                }
                error={Boolean(errorLastNameValue)}
                value={lastNameValue}
                required
                onChange={(e) => {
                  setErrorLastNameValue("");
                  const lettersOnlyRegex = /^[A-Za-zА-Яа-я]+$/;
                  if (
                    lettersOnlyRegex.test(e.target.value) ||
                    e.target.value.length === 0
                  ) {
                    setLastNameValue(e.target.value);
                  }
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReactPhoneInput
                component={TextField}
                value={phoneValue}
                onChange={(value) => {
                  setErrorPhoneValue("");
                  setPhoneValue(value);
                }}
                fullWidth
                label={"Телефон"}
                placeholder="+7 (123) 456-78-90"
                inputProps={{
                  required: true,
                  helperText: Boolean(errorPhoneValue)
                    ? errorPhoneValue
                    : "Введите свой телефон",
                  error: Boolean(errorPhoneValue),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                placeholder="example@email.com"
                helperText={
                  Boolean(errorEmailValue)
                    ? errorEmailValue
                    : "Введите свой email"
                }
                error={Boolean(errorEmailValue)}
                value={emailValue}
                required
                onChange={(e) => {
                  setErrorEmailValue("");
                  setEmailValue(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container pt={2} textAlign={"end"}>
            <Grid item xs={12}>
              <Typography>{`Количество дней: ${daysCount}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{`Итого: ${totalPrice}`}</Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Grid container spacing={1} pt={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={() => window.history.go(-1)}
              >
                Отменить
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Подтвердить
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
