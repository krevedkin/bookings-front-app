import {
  Container,
  Box,
  CssBaseline,
  Typography,
  Divider,
  Grid,
  Rating,
} from "@mui/material";
import { RoomCard } from "../components/RoomCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ServiceChip } from "../components/ServiceChip";
import QuiltedImageList from "../components/Images";
const fakeServices = [
  "Бесплатный wi-fi",
  "Можно с животными",
  "Хуй пизда джигурда",
  "Хуй пизда джигурда и вагина",
  "Бесплатный wi-fi",
  "Можно с животными",
  "Хуй пизда джигурда",
  "Хуй пизда джигурда и вагина",
  "Можно с животными",
];
export const HotelPage = () => {
  return (
    <Container maxWidth={"sm"}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          marginBottom: 8,
          flexDirection: "column",
        }}
      >
        <Typography variant="h2">Hotel name</Typography>
        <Typography variant="h5" color={"primary"}>
          {<LocationOnIcon color="error" />}Hotel address
        </Typography>
        <Grid container justifyContent={"flex-end"}>
          <Rating readOnly value={3} sx={{ fontSize: "40px" }}></Rating>
        </Grid>

        <Divider sx={{ pt: 1 }} />

        <Grid container spacing={1} pt={2}>
          {fakeServices.map((text, index) => {
            return (
              <Grid item key={index}>
                {<ServiceChip label={text} />}
              </Grid>
            );
          })}
        </Grid>
        <Typography variant="subtitle1" pt={2}>
          Фото:
        </Typography>
        <Divider sx={{ pt: 1 }} />

        <Grid container justifyContent={"center"}>
          <QuiltedImageList />
        </Grid>
        <Divider sx={{ pt: 1 }} />

        <Typography variant="subtitle1" pt={1}>
          Описание:
        </Typography>
        <Container>
          <Typography variant="p">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
            sequi fugit dignissimos, sit voluptate quae voluptatibus esse, ut
            veniam nam nostrum vero magni tenetur, consectetur delectus suscipit
            vel laboriosam adipisci!
          </Typography>
        </Container>

        {fakeServices.map((text, index) => {return (<RoomCard sx={{mt:2}}/>)})}
        {/* <RoomCard sx={{ mt: 2 }} />
        <RoomCard sx={{ mt: 2 }} />
        <RoomCard /> */}
      </Box>
    </Container>
  );
};
