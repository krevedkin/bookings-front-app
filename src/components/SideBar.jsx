import { useEffect } from "react";
import { DateChooser } from "./DateChooser";
import InfoIcon from "@mui/icons-material/Info";
import { useTheme } from "@mui/material/";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Rating,
  Slider,
  Button,
  Grid,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material/";
import { useHomePageStore } from "../store/store";

const drawerWidth = 240;

function SideBar(props) {
  const { window } = props;
  const theme = useTheme();

  const setPageTitle = useHomePageStore((state) => state.setPageTitle);
  const costSliderValues = useHomePageStore((state) => state.costSliderValues);
  const setCostSliderValues = useHomePageStore(
    (state) => state.setCostSliderValues
  );

  const mobileOpen = useHomePageStore((state) => state.isMobileOpen);
  const handleDrawerToggle = useHomePageStore((state) => state.setIsMobileOpen);

  const setStarsCount = useHomePageStore((state) => state.setStarsCount);
  const starsCount = useHomePageStore((state) => state.starsCount);

  const dropdownValue = useHomePageStore((state) => state.dropdownValue);
  const setDropdownValue = useHomePageStore((state) => state.setDropdownValue);
  const cities = useHomePageStore((state) => state.cities);

  const dateFrom = useHomePageStore((state) => state.dateFrom);
  const setSelectedDateFrom = useHomePageStore(
    (state) => state.setSelectedDateFrom
  );

  const dateTo = useHomePageStore((state) => state.dateTo);
  const setSelectedDateTo = useHomePageStore(
    (state) => state.setSelectedDateTo
  );

  const handleConfirmButton = useHomePageStore(
    (state) => state.handleConfirmButton
  );
  const handleResetButton = useHomePageStore(
    (state) => state.handleResetButton
  );

  const getCities = useHomePageStore((state) => state.getCities);

  useEffect(() => {
    getCities();
  }, []);
  const drawer = (
    <div>
      <Toolbar />
      <List disablePadding sx={{ mt: 5 }}>
        <ListItem sx={{ textAlign: "center" }}>
          <Grid
            container
            justifyContent={"center"}
            spacing={1}
            alignItems={"center"}
          >
            <Grid item>
              <ListItemText primary="Выбрать даты" />
            </Grid>
            <Grid item>
              <Tooltip
                title={
                  <Typography>
                    При выборе дат будут показаны только те отели, у которых
                    есть хотя бы одна свободная комната на выбранный период
                  </Typography>
                }
                placement="right-start"
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem disablePadding sx={{ px: 1 }}>
          <DateChooser
            label="Дата заезда"
            value={dateFrom}
            onChange={setSelectedDateFrom}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: theme.palette.text.primary,
              },
            }}
          />
        </ListItem>
        <ListItem disablePadding sx={{ px: 1 }}>
          <DateChooser
            label="Дата выезда"
            value={dateTo}
            onChange={setSelectedDateTo}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: theme.palette.text.primary,
              },
            }}
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
              {cities.map((text) => {
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
            step={10}
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
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              handleConfirmButton();
              setPageTitle("Все отели");
            }}
          >
            Применить
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              handleResetButton();
              setPageTitle("Все отели");
            }}
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
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
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
