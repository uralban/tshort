import React from "react";
import { NavLink } from "react-router-dom";

import LinkItem from "./LinkItem";
import ItemsInCart from "./ItemsInCart";

export default function TopbarAuth() {
  return (
    <div className="topbar">
      <ul className="nav justify-content-end">
        <NavLink 
          to="/orders" 
          classNameLi="nav-item" 
          classNameA="nav-link" 
          component={LinkItem}
        >
          My orders
        </NavLink>
        <NavLink 
          to="/cart" 
          classNameLi="nav-item" 
          classNameA="nav-link" 
          component={LinkItem}
        >
          Cart
        </NavLink>
        <ItemsInCart />
        <NavLink 
          to="/logout" 
          classNameLi="nav-item" 
          classNameA="nav-link" 
          component={LinkItem}
        >
          Logout
        </NavLink>
      </ul>      
    </div>
  );
}