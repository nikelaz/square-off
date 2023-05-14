import React from 'react';
import { NavLink } from "react-router-dom";

const Link = ({ to, children, activeClass, pendingClass }) => (
  <NavLink
    to={to}
    className={({ isActive, isPending }) =>
      isPending ? (pendingClass || 'is-pending') : isActive ? (activeClass || 'is-active') : ''
    }
  >
    {children}
  </NavLink>
);

export default Link;
