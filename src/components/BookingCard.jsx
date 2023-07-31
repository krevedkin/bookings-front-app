import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

export const BookingCard = (props) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Card>
        <CardHeader
          title={props.hotelName}
          subheader={`Номер: ${props.roomName}`}
        />
        <Divider sx={{ pt: 1 }} />
        <CardContent>
          <Grid container justifyContent={"space-around"}>
            <Grid item xs={12}>
              <Typography>{`Дата заезда: ${props.dateFrom}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{`Дата выезда: ${props.dateTo}`}</Typography>
            </Grid>
          </Grid>
          <Grid container pt={1}>
            <Grid item xs={12}>
              <Typography>{`Общая цена: ${props.totalCost}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{`Количество дней: ${props.totalDays}`}</Typography>
            </Grid>
          </Grid>
          <Grid container></Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent={"end"} pr={1}>
            <Button
              color="error"
              size="small"
              onClick={() => setOpenModal(true)}
            >
              Отменить
            </Button>
          </Grid>
        </CardActions>
      </Card>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Вы уверены что хотите отменить бронирование?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Отмена</Button>
          <Button
            onClick={() => {
              props.deleteBooking(props.id);
              setOpenModal(false);
            }}
            autoFocus
            color="error"
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
