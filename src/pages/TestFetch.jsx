import { Toolbar, Container } from "@mui/material";
import { useHotelsStore } from "../store/store";

export const TestFetch = () => {
  const fetchHotels = useHotelsStore((state) => state.fetchHotels);
  return (
    <Container>
      <Toolbar />
      <button onClick={fetchHotels}>Click me!</button>
    </Container>
  );
};
