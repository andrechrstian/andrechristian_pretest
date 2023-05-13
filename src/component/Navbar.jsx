import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-headline">AXA FE PRETEST</div>
      <div className="navbar-link">
        <div>
          <Link to="/" className="m-2">
            User
          </Link>
        </div>
        <div>
          <Link to="/post" className="m-2">
            Post
          </Link>
        </div>
        <div>
          <Link to="/album" className="m-2">
            Album
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
