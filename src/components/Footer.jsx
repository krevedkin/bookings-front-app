import { Typography, Box, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
export const Footer = () => {
  return (
    <Box textAlign={"center"}>
      <Typography variant="body2" color="text.secondary">
        krevedkin
      </Typography>
      <IconButton href="https://github.com/krevedkin?tab=repositories">
        <GitHubIcon />
      </IconButton>
      <IconButton href="https://www.linkedin.com/in/игорь-быкадоров-37049426b/">
        <LinkedInIcon />
      </IconButton>
      <IconButton href="https://t.me/Krevedko_Krevedkin">
        <TelegramIcon />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        2023
      </Typography>
    </Box>
  );
};
