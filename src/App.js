import { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Home from "./pages/home/home";
import Book from "./pages/book/index.js";

function App() {
  return (
    <Routes>
      <Route path="book" element={<Book />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
