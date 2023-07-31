import { Box, Toolbar, Typography, Grid, Container } from "@mui/material";
import { useAppBarStore, useUserBookingsPage } from "../store/store";
import { BookingCard } from "../components/BookingCard";
import { useEffect } from "react";

export const UserBookingsPage = () => {
  const bookings = useUserBookingsPage((state) => state.bookings);
  const setBookings = useUserBookingsPage((state) => state.setBookings);
  const fetchBookings = useUserBookingsPage((state) => state.fetchBookings);
  const deleteBooking = useUserBookingsPage((state) => state.deleteBooking);
  const bookingBadgeCount = useAppBarStore((state) => state.bookingBadgeCount);
  const setBookingBadgeCount = useAppBarStore(
    (state) => state.setBookingBadgeCount
  );
  const handleBookingDelete = async (id) => {
    setBookings(bookings.filter((booking) => booking.booking_id !== id));
    await deleteBooking(id);
    setBookingBadgeCount(bookingBadgeCount - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBookings();
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth={"sm"}>
      <Box>
        <Toolbar />
        <Typography variant="h3" textAlign={"center"} pt={2}>
          Мои бронирования
        </Typography>
        {bookings.length === 0 ? (
          <Box display={"flex"} mt={10}>
            <Typography
              variant="h3"
              color="text.secondary"
              textAlign={"center"}
            >
              У вас нет бронирований
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2} pt={2} justifyContent={"center"}>
            {bookings.map((booking, index) => {
              return (
                <Grid item key={index}>
                  <BookingCard
                    id={booking.booking_id}
                    description={booking.description}
                    dateFrom={booking.date_from}
                    dateTo={booking.date_to}
                    totalCost={booking.total_cost}
                    totalDays={booking.total_days}
                    roomName={booking.room_name}
                    hotelName={booking.hotel_name}
                    deleteBooking={handleBookingDelete}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Container>
  );
};
