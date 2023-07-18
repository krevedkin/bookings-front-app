import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BedIcon from "@mui/icons-material/Bed";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { useSideBarStore } from "../store/store";

export function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openMobileMenu = useSideBarStore(state => state.setIsMobileOpen)
  
  return (
    <AppBar color="secondary" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={openMobileMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hotels!
        </Typography>

        <IconButton
          size="large"
          aria-label="favorite hotels"
          aria-haspopup="true"
          color="inherit"
        >
          <FavoriteIcon />
        </IconButton>

        <IconButton
          size="large"
          aria-label="user bookings"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <BedIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Привет</MenuItem>
          <MenuItem onClick={handleClose}>Мир</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
