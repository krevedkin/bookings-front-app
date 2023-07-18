import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Grid,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BedIcon from "@mui/icons-material/Bed";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
export const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      {/* <button onClick={() => setMenuOpen(!menuOpen)}>Нажми на меня</button> */}
      <IconButton onClick={() => setMenuOpen(!menuOpen)}>
        <MoreVertIcon />
      </IconButton>
      <Grid container>
        <Grid item xs={12} md={3}>Тема</Grid>
        <Grid item xs={12} md={3}>Тема</Grid>
        <Grid item xs={12} md={3}>Тема</Grid>
        <Grid item xs={12} md={3}>Тема</Grid>
      </Grid>
      {/* {menuOpen && (
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>
              <ListItemText primary="Переключить тему" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Избранные отели" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BedIcon />
              </ListItemIcon>
              <ListItemText primary="Мои бронирования" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>
              <ListItemText primary="Переключить тему" />
            </ListItemButton>
          </ListItem>
        </List>
      )} */}
    </div>
  );
};
