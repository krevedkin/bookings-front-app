import { Header } from "./Header";
import { Box } from "@mui/material";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box sx={{ minHeight: "85vh", overflowY: "auto" }}>{children}</Box>
      <Box sx={{ pt: 6 }} component="footer">
        <Footer />
      </Box>
    </Box>
  );
};
