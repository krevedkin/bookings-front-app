import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { HotelPage } from "./pages/HotelPage";
import { Layout } from "./components/Layout";
import { BookingPage } from "./pages/BookingPage";
import { TestFetch } from "./pages/TestFetch";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/rooms" element={<HotelPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/test" element={<TestFetch />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
