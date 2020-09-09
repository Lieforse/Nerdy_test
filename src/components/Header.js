import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg navbar-light bg-dark">
        <NavLink to="/" className="navbar-brand">
          Announcement Website
        </NavLink>
      </nav>
    );
  }
}

export default Header;
