import { useNavigate } from "react-router-dom";

import { HotelCard } from "../components/HotelCard";
import Grid from "@mui/material/Grid";
import { useAppBarStore, useHomePageStore } from "../store/store";

import {
  Toolbar,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material/";
import MuiAlert from "@mui/material/Alert";
import SideBar from "../components/SideBar";
import { useEffect, forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const HomePage = () => {
  const navigate = useNavigate();
  const openHotelPage = (id) => navigate(`/hotel/${id}`);
  const hotels = useHomePageStore((state) => state.hotels);
  const setHotels = useHomePageStore((state) => state.setHotels);
  const loading = useHomePageStore((state) => state.loading);
  const fetchHotels = useHomePageStore((state) => state.fetchHotels);

  const pageTitle = useHomePageStore((state) => state.pageTitle);
  const alertOpen = useHomePageStore((state) => state.alertOpen);
  const setAlertOpen = useHomePageStore((state) => state.setAlertOpen);
  const favoriteBadgeCount = useAppBarStore(
    (state) => state.favoriteBadgeCount
  );
  const setFavoriteBadgeCount = useAppBarStore(
    (state) => state.setFavoriteBadgeCount
  );

  const addFavoriteHotel = useHomePageStore((state) => state.addFavoriteHotel);
  const removeFavoriteHotel = useHomePageStore(
    (state) => state.removeFavoriteHotel
  );

  const handleCardLikeButton = async (id) => {
    switch (pageTitle) {
      case "Все отели":
        const newHotels = hotels.map((hotel) => {
          return hotel.id === id
            ? { ...hotel, is_favorite: !hotel.is_favorite }
            : hotel;
        });

        const updatedHotel = newHotels.find((hotel) => hotel.id === id);
        if (updatedHotel.is_favorite) {
          await addFavoriteHotel(id);
          setFavoriteBadgeCount(favoriteBadgeCount + 1);
        } else {
          await removeFavoriteHotel(id);
          setFavoriteBadgeCount(favoriteBadgeCount - 1);
        }
        setHotels(newHotels);
        break;
      case "Избранное":
        setHotels(hotels.filter((hotel) => hotel.id !== id));
        await removeFavoriteHotel(id);
        setFavoriteBadgeCount(favoriteBadgeCount - 1);
        break;
      default:
        
    }
  };

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
      console.log("useEffect");
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
          width: { sm: `calc(100% - ${240}px)` },
          height: "100%",
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
          <>
            <Snackbar
              open={alertOpen}
              onClose={() => setAlertOpen(false)}
              autoHideDuration={6000}
              severity="success"
              message="Note archived"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{ pt: 8 }}
            >
              <Alert
                onClose={() => setAlertOpen(false)}
                severity="success"
                sx={{ width: "100%" }}
              >
                Бронирование успешно завершено
              </Alert>
            </Snackbar>
            {hotels.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "70vh",
                }}
              >
                <Typography variant="h2" textAlign="center">
                  {pageTitle === "Все отели"
                    ? "Отели не найдены"
                    : "Нет избранных отелей"}
                </Typography>
              </div>
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
                        handleLikeClick={handleCardLikeButton}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
