import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { HotelPage } from "./pages/HotelPage";
import { Layout } from "./components/Layout";
import { BookingPage } from "./pages/BookingPage";
import { TestFetch } from "./pages/TestFetch";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./theme/theme";
import { useAppBarStore } from "./store/store";
function App() {
  const isDarkMode = useAppBarStore((state) => state.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/booking/:roomId" element={<BookingPage />} />
            <Route path="/hotel/:id" element={<HotelPage />} />
            <Route path="/test" element={<TestFetch />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
