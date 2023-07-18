import { HotelCard } from "../components/HotelCard";
import Grid from "@mui/material/Grid";
import { useHotelsStore, useSideBarStore } from "../store/store";

import { Toolbar, Typography, Box, CircularProgress } from "@mui/material/";
import SideBar from "../components/SideBar";
import { useEffect } from "react";

export const HomePage = () => {
  const hotels = useHotelsStore((state) => state.hotels);
  const loading = useHotelsStore((state) => state.loading);
  const fetchHotels = useHotelsStore((state) => state.fetchHotels);

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <SideBar />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
        }}
      >
        <Toolbar />
        <Typography variant="h2">Все отели</Typography>

        {loading ? ( // Проверяем значение loading
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px", // Установите высоту, чтобы контент не смещался
            }}
          >
            <CircularProgress size={120} />
          </Box>
        ) : (
          <Grid container spacing={4} mt={1}>
            {hotels.map((hotel, index) => {
              return (
                <Grid item key={index} pt={5} xs={12} sm={6} md={4}>
                  <HotelCard
                    id={hotel.id}
                    name={hotel.name}
                    location={hotel.location}
                    imgUrl={hotel.image_url}
                    description={hotel.description}
                    stars={hotel.stars}
                    minPrice={hotel.min_price}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}

        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
