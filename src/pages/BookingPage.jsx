import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DateChooser } from "../components/DateChooser";
import { useEffect } from "react";
import { useBookingPageStore, useHotelPageStore } from "../store/store";
import { useLocation, useParams } from "react-router-dom";
export const BookingPage = () => {
  const hotelData = useHotelPageStore((state) => state.hotelData);
  const getHotelData = useHotelPageStore((state) => state.getHotelData);
  const roomData = useBookingPageStore((state) => state.roomData);
  const getRoomData = useBookingPageStore((state) => state.getRoomData);
  const { roomId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRoomData(roomId);
      await getHotelData(response?.data?.hotel_id);
    };
    fetchData();
  }, []);

  if (!roomData || !hotelData) {
    return <div>Loading...</div>;
  }
  return (
    <Container maxWidth={"sm"}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component={"form"} sx={{ mt: 3, mb: 5 }}>
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
          </Grid>
          <Grid container pt={2} spacing={1}>
            <Grid item sm={12}>
              <Typography>Выберите даты</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateChooser label="Дата заезда" sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateChooser label="Дата выезда" sx={{ width: "100%" }} />
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
                placeholder="Иван"
                helperText="Введите свое имя"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Фамилия"
                placeholder="Иванов"
                helperText="Введите свою фамилию"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Телефон"
                placeholder="+7 123 456 789"
                helperText="Введите свой телефон"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                placeholder="example@email.com"
                helperText="Введите свой Email"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container pt={2} textAlign={"end"}>
            <Grid item xs={12}>
              <Typography>Количество дней: 0</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Итого: 0</Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Grid container spacing={1} pt={2}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth color="secondary">
                Отменить
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                Подтвердить
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
