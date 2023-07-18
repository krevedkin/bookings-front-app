import { createTheme } from "@mui/material";
import { lightBlue, deepOrange, grey } from "@mui/material/colors";
export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: lightBlue[400]
      },
      secondary: {
        main: deepOrange[400]
      },
      background: {
        paper: grey["900"],
        default: grey["900"],
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });
  
  export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: lightBlue[900]
      },
      secondary: {
        main: deepOrange[900]
      },
      background: {
        // paper: lightBlue["50"], // Цвет фона AppBar
        default: grey["100"], // Цвет фона контента
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });