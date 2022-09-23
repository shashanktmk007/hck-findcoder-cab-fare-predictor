import { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Home from "./pages/home/home";
import Book from "./pages/book/index.js";
import { Schedule } from "./pages/schedule";

function App() {
  return (
    <Routes>
      <Route path="book" element={<Book />} />
      <Route path="schedule" element={<Schedule />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
