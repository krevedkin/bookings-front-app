import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  useMediaQuery,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BedIcon from "@mui/icons-material/Bed";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useHomePageStore } from "../store/store";
import { useAppBarStore } from "../store/store";

export function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const openMobileMenu = useHomePageStore((state) => state.setIsMobileOpen);
  const favoriteBadgeCount = useAppBarStore(
    (state) => state.favoriteBadgeCount
  );
  const isDarkMode = useAppBarStore((state) => state.isDarkMode);
  const setIsDarkMode = useAppBarStore((state) => state.setIsDarkMode);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* Mobile content */}
        {isSmallScreen && (
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
        )}

        <Typography
          component="a"
          href={"/home"}
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
            fontWeight: 900,
            letterSpacing: ".1rem",
          }}
        >
          Полуостровок.ру
        </Typography>

        {isSmallScreen ? (
          <div>
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              <MoreVertIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            >
              <Toolbar />
              <Box>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setIsDarkMode(!isDarkMode)}>
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
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="Пользователь" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Выйти из аккаунта" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </div>
        ) : (
          <div>
            {/* Desktop content */}
            <Box
              component={"div"}
              sx={{ flexGrow: 1 }}
              display={"flex"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                alignContent={"center"}
                alignItems={"center"}
                justifyContent={"start"}
                pl={3}
              ></Box>
            </Box>

            <IconButton
              size="large"
              aria-label="favorite hotels"
              aria-haspopup="true"
              color="inherit"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <Badge>
                <DarkModeIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="favorite hotels"
              aria-haspopup="true"
              color="inherit"
            >
              <Badge badgeContent={favoriteBadgeCount} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="user bookings"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Badge badgeContent={2} color="secondary">
                <BedIcon />
              </Badge>
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
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
