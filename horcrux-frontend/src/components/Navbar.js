// src/components/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Create this CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>HorCurx</h1>
      <div className="nav-links">
        <NavLink to="/" end activeClassName="active">
          Add
        </NavLink>
        <NavLink to="/archives" activeClassName="active">
          Archives
        </NavLink>
        <NavLink to="/tag-search" activeClassName="active">
          Search
        </NavLink>
        <NavLink to="/stats" activeClassName="active">
          Stats
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
