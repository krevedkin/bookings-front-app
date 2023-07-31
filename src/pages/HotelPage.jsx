import {
  Container,
  Box,
  Typography,
  Divider,
  Grid,
  Rating,
  Chip,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { RoomCard } from "../components/RoomCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Images } from "../components/Images";
import { useHotelPageStore } from "../store/store";
import { useEffect, useState } from "react";
export const HotelPage = () => {
  const hotelData = useHotelPageStore((state) => state.hotelData);
  const getHotelData = useHotelPageStore((state) => state.getHotelData);
  const { id } = useParams();
  const navigate = useNavigate();
  const openRoomBookingPage = (roomId) => navigate(`/booking/${roomId}`);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getHotelData(id);
      setImages(response?.data?.rooms.map((room) => room.image_url));
    };
    fetchData();
  }, []);

  if (!hotelData) {
    return <div>Loading...</div>;
  }
  return (
    <Container maxWidth={"sm"}>
      <Box
        sx={{
          marginTop: 10,
          marginBottom: 8,
          flexDirection: "column",
        }}
      >
        <Typography variant="h2">{hotelData?.name}</Typography>
        <Typography variant="h5" color={"primary"}>
          {<LocationOnIcon color="error" />}
          {hotelData?.city} {hotelData?.address}
        </Typography>
        <Grid container justifyContent={"flex-end"}>
          <Rating
            readOnly
            value={hotelData?.stars}
            sx={{ fontSize: "40px" }}
          ></Rating>
        </Grid>

        <Divider sx={{ pt: 1 }} />

        <Grid container spacing={1} mt={2}>
          {hotelData.services.map((text, index) => {
            return (
              <Grid item key={index}>
                <Chip color="primary" variant="outlined" label={text} />
              </Grid>
            );
          })}
        </Grid>
        <Typography variant="subtitle1" pt={2}>
          Фото:
        </Typography>
        <Divider sx={{ pt: 1 }} />

        <Grid container justifyContent={"center"}>
          <Images roomImages={images} cols={images.length === 1 ? 1 : 2} />
        </Grid>
        <Divider sx={{ pt: 1 }} />

        <Typography variant="subtitle1" pt={1}>
          Описание:
        </Typography>
        <Container>
          <Typography variant="p">{hotelData.description}</Typography>
        </Container>

        {hotelData.rooms.map((room, index) => {
          return (
            <RoomCard
              key={index}
              id={room.id}
              name={room.name}
              quantity={room.quantity}
              price={room.price}
              services={room.services}
              sx={{ mt: 2 }}
              openBookingPage={openRoomBookingPage}
            />
          );
        })}
      </Box>
    </Container>
  );
};
