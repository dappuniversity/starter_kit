import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <nav
      className="navbar navbar-dark fixed-top shadown p-0"
      style={{ backgroundColor: "black", height: "50px" }}
    >
      {/* <a href="/" style={{ color: "white" }}> */}
      <a style={{ color: "white" }}>
        {/* &nbsp; */}
        {props.image}
        {props.title}
      </a>
      {/* </a> */}
      <ul>
        <li>
          <small style={{ color: "white" }}>
            Account Number: {props.account} &nbsp;&nbsp;
          </small>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
