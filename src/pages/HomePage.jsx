import { useNavigate } from "react-router-dom";

import { HotelCard } from "../components/HotelCard";
import Grid from "@mui/material/Grid";
import { useAppBarStore, useHomePageStore } from "../store/store";

import { Toolbar, Typography, Box, CircularProgress } from "@mui/material/";
import SideBar from "../components/SideBar";
import { useEffect } from "react";

export const HomePage = () => {
  const navigate = useNavigate();
  const openHotelPage = (id) => navigate(`/hotel/${id}`);
  const hotels = useHomePageStore((state) => state.hotels);
  const loading = useHomePageStore((state) => state.loading);
  const fetchHotels = useHomePageStore((state) => state.fetchHotels);
  const setFavoriteBadgeCount = useAppBarStore(
    (state) => state.setFavoriteBadgeCount
  );
  const pageTitle = useHomePageStore((state) => state.pageTitle);

  const calculateFavoriteHotels = (data) => {
    return data.reduce((accumulator, element) => {
      if (element.is_favorite === true) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchHotels();
      const favoriteHotelsCount = calculateFavoriteHotels(response?.data);
      setFavoriteBadgeCount(favoriteHotelsCount);
    };
    fetchData();
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
        <Typography variant="h2">{pageTitle}</Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
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
                    city={hotel.city}
                    imgUrl={hotel.image_url}
                    description={hotel.description}
                    stars={hotel.stars}
                    minPrice={hotel.min_price}
                    isFavorite={hotel.is_favorite}
                    openHotelPage={openHotelPage}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
