import { Header } from "./Header";
import { Box, Typography } from "@mui/material";

export const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box sx={{minHeight:"85vh", overflowY:"auto"}}>{children}</Box>
      <Box sx={{ p: 6 }} component="footer">
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
  );
};
