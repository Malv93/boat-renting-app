import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import CentroVelicoLogin from "./pages/centri-velici/CentroVelicoLogin.tsx";
import VelistaLogin from "./pages/velisti/VelistaLogin.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-centro-velico" element={<CentroVelicoLogin />} />
        <Route path="/login-velista" element={<VelistaLogin />} />
        {/* <Route path="/home-centro-velico" element={<CentriVeliciHome />} />
        <Route path="/home-velista" element={<VelistiHome />} /> */}
        {/* <Route
          path="/centro-velico-esempio"
          element={<CentroVelicoEsempio />}
        />
        <Route path="/boats" element={<Boats />} />
        <Route path="/rentals" element={<Rentals />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
