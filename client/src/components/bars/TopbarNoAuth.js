import React from "react";
import { NavLink } from "react-router-dom";

import LinkItem from "./LinkItem";

export default function TopbarNoAuth() {
  return (
    <div className="topbar">
      <ul className="nav justify-content-end">
        <NavLink 
          to="/login" 
          classNameLi="nav-item" 
          classNameA="nav-link" 
          component={LinkItem}
        >
          Login
        </NavLink>
        <NavLink 
          to="/create" 
          classNameLi="nav-item" 
          classNameA="nav-link" 
          component={LinkItem}
        >
          Registration
        </NavLink>
      </ul>      
    </div>
  );
}