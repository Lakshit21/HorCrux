// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AddLink from "./pages/AddLink";
import Archives from "./pages/Archives";
import TagSearch from "./pages/TagSearch";
import EditLink from "./pages/EditLink";
import CheckStats from "./pages/CheckStats";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AddLink />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/tag-search" element={<TagSearch />} />
        <Route path="/edit/:id" element={<EditLink />} />{" "}
        <Route path="/stats" element={<CheckStats />} />
        {/* Add the edit route */}
      </Routes>
    </div>
  );
}

export default App;
