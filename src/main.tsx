import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Boats from "./pages/Boats.tsx";
import Rentals from "./pages/Rentals.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boats" element={<Boats />} />
        <Route path="/rentals" element={<Rentals />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);