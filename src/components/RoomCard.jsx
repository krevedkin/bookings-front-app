import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";

export const RoomCard = ({ id, name, quantity, services, price, openBookingPage, sx }) => {
  return (
    <Card sx={{ ...sx }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle1">{name}</Typography>
          <Divider sx={{ pt: 2 }} />
          <Typography variant="subtitle2" pt={2}>
            {`Количество номеров: ${quantity}`}
          </Typography>

          <Grid container spacing={1} pt={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Удобства:</Typography>
            </Grid>

            {services.map((service, index) => {
              return (
                <Grid item container xs={4} sm={3} key={index}>
                  <Typography variant="caption" sx={{ fontSize: 12 }}>
                    &bull; {service}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ pt: 2 }} />

          <Grid
            item
            container
            xs={12}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ pt: 3 }}
          >
            <Typography variant="subtitle1">{`Цена за ночь: ${price} руб.`}</Typography>
            <Button variant="contained" size="small" onClick={() => openBookingPage(id)}>
              Забронировать
            </Button>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
