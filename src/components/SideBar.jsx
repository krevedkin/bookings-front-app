import { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { DateChooser } from "./DateChooser";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Rating,
  Slider,
  Button,
} from "@mui/material/";
import { useSideBarStore } from "../store/store";

const drawerWidth = 240;

function SideBar(props) {
  const { window } = props;
  const theme = useTheme();

  const costSliderValues = useSideBarStore((state) => state.costSliderValues);
  const setCostSliderValues = useSideBarStore((state) => state.setCostSliderValues);

  const mobileOpen = useSideBarStore((state) => state.isMobileOpen);
  const handleDrawerToggle = useSideBarStore((state) => state.setIsMobileOpen);

  const setStarsCount = useSideBarStore((state) => state.setStarsCount);
  const starsCount = useSideBarStore((state) => state.starsCount);

  const dropdownValue = useSideBarStore((state) => state.dropdownValue);
  const setDropdownValue = useSideBarStore((state) => state.setDropdownValue);
  const dropdownPlaces = useSideBarStore((state) => state.places);

  const dateFrom = useSideBarStore((state) => state.dateFrom);
  const setSelectedDateFrom = useSideBarStore((state) => state.setSelectedDateFrom);

  const dateTo = useSideBarStore((state) => state.dateTo);
  const setSelectedDateTo = useSideBarStore((state) => state.setSelectedDateTo);

  const handleConfirmButton = useSideBarStore((state) => state.handleConfirmButton);
  const handleResetButton = useSideBarStore((state) => state.handleResetButton);

  const fetchPlaces = useSideBarStore((state) => state.fetchPlaces);

  useEffect(() => fetchPlaces, []);
  const drawer = (
    <div>
      <Toolbar sx={{ bgcolor: theme.palette.primary.main }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          color={theme.palette.primary.contrastText}
        >
          Hotels
        </Typography>
      </Toolbar>

      <List disablePadding sx={{ mt: 5 }}>
        <ListItem disablePadding sx={{ textAlign: "center" }}>
          <ListItemText primary="Выбрать даты" />
        </ListItem>
        <ListItem disablePadding sx={{ px: 1 }}>
          <DateChooser
            label="Дата заезда"
            value={dateFrom}
            onChange={setSelectedDateFrom}
          />
        </ListItem>
        <ListItem disablePadding>
          <DateChooser
            label="Дата выезда"
            value={dateTo}
            onChange={setSelectedDateTo}
            sx={{ px: 1 }}
          />
        </ListItem>
        <ListItem disablePadding sx={{ textAlign: "center" }}>
          <ListItemText primary="Выбрать местоположение" sx={{ pt: 2 }} />
        </ListItem>

        <ListItem disablePadding sx={{ px: 1, pt: 1 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-autowidth-label">
              Место
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              label="Место"
              sx={{ width: "222px" }}
              value={dropdownValue}
            >
              <MenuItem value="all" onClick={() => setDropdownValue("all")}>
                <em>Все</em>
              </MenuItem>
              {dropdownPlaces.map((text) => {
                return (
                  <MenuItem
                    key={text}
                    value={text}
                    onClick={() => setDropdownValue(text)}
                  >
                    {text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem disablePadding sx={{ textAlign: "center", pt: 2 }}>
          <ListItemText primary="Рейтинг отеля" />
        </ListItem>
        <ListItem disablePadding sx={{ justifyContent: "center" }}>
          <Rating
            value={starsCount}
            onChange={(e, value) => setStarsCount(value)}
          />
        </ListItem>
        <ListItem disablePadding sx={{ textAlign: "center", pt: 2 }}>
          <ListItemText primary="Цена за ночь" />
        </ListItem>

        <ListItem>
          <Slider
            getAriaLabel={() => "Minimum distance shift"}
            value={costSliderValues}
            onChange={setCostSliderValues}
            valueLabelDisplay="auto"
            disableSwap
            min={0}
            max={10000}
          />
        </ListItem>
        <ListItem sx={{ pt: 0 }}>
          <ListItemText
            primary={`От: ${costSliderValues[0]} руб.`}
            sx={{ textAlign: "start" }}
          />
          <ListItemText
            primary={`До: ${costSliderValues[1]} руб.`}
            sx={{ textAlign: "end" }}
          />
        </ListItem>

        <ListItem>
          <Button fullWidth variant="contained" onClick={handleConfirmButton}>
            Применить
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleResetButton}
          >
            Сбросить
          </Button>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideBar;
