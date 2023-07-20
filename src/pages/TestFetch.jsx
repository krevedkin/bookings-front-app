import { Toolbar, Container } from "@mui/material";
import { API } from "../http/api";

export const TestFetch = () => {
  return (
    <Container>
      <Toolbar />
      <button
        onClick={async () =>
          
          API.deleteFavoriteHotel(1)
        }
      >
        Нажми на меня
      </button>
    </Container>
  );
};
