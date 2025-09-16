import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConductorForm from "./components/ConductorForm";
import ResultsPage from "./components/ResultsPage"; // Assuming ResultsPage is in components folder

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConductorForm />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}