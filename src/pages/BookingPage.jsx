import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DateChooser } from "../components/DateChooser";

export const BookingPage = () => {
  return (
    <Container maxWidth={"sm"}>
      <CssBaseline />
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
                <b>Отель: </b>Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Laboriosam modi, in quibusdam, ex aspernatur
                natus autem magni hic veniam velit distinctio accusamus aliquam?
                Nemo deserunt modi beatae eius in praesentium.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <b>Номер: </b>Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Minus consequuntur veritatis ut accusamus eligendi soluta
                dolorum, laudantium facilis commodi quisquam assumenda optio
                sit. Deleniti, enim. Dolore, culpa magnam! Dolores, debitis.
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
              <Button variant="contained" fullWidth color="error">
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
