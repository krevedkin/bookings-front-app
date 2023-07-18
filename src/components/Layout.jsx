import { Header } from "./Header";
import { Box } from "@mui/material";

export const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box>{children}</Box>
    </Box>
  );
};
