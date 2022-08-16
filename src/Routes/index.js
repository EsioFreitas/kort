import React from "react";
import { Routes, Route } from "react-router-dom";
import CardPage from "../Pages/CardPage";
import MainPage from "../Pages/MainPage";
import WelcomePage from "../Pages/WelcomePage";
import MetricsPage from "../Pages/MetricsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/main-page" element={<MainPage />} />
      <Route path="card/:id" element={<CardPage />} />
      <Route path="metrics" element={<MetricsPage />} />
    </Routes>
  );
}
