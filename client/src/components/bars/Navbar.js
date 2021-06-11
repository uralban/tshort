import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../img/1200x630wa.png';

import LinkItem from "./LinkItem";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="App-logo" alt="logo" width="150" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink 
              to="/category/auto-moto" 
              classNameLi="nav-item" 
              classNameA="nav-link" 
              component={LinkItem}
            >
              Auto, moto
            </NavLink>
            <NavLink 
              to="/category/it-guys" 
              classNameLi="nav-item"               
              classNameA="nav-link" 
              component={LinkItem}
            >
              It guys
            </NavLink>
            <NavLink 
              to="/category/internet-jokes" 
              classNameLi="nav-item" 
              classNameA="nav-link"
              component={LinkItem}
            >
              Internet jokes
            </NavLink>
            <NavLink 
              to="/category/music" 
              classNameLi="nav-item" 
              classNameA="nav-link"
              component={LinkItem}
            >
              Music
            </NavLink>
            <NavLink 
              to="/category/holidays" 
              classNameLi="nav-item" 
              classNameA="nav-link"
              component={LinkItem}
            >
              Holidays
            </NavLink>
            <NavLink 
              to="/category/humor" 
              classNameLi="nav-item" 
              classNameA="nav-link"
              component={LinkItem}
            >
              Humor
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}