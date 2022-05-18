import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Switch, Link, Route} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import "./Main.css";
import Signature from "./enterSignature";
import Vote from "./Vote";
import Main from "./Main";

export default class App extends React.Component {

  render() {
    let layout = (
      <div>
    <Router>
    <div className="main">
    
      <div className="navbarMe">

        <nav class="navbar navbar-expand-sm bg-dark">
        <a class="navbar-brand" href="#">Collaborative Intrusion Detection Platform</a>
          <ul class="navbar-nav">
          
            <li class="nav-item">
            <Link class="nav-link" to="/Main"> Home </Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/enterSignature"> Add Signature </Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/Vote"> Vote </Link>
            </li>
        
          </ul>
        </nav>

        </div>
    
    </div>
    <Routes>
            <Route path="/Main" element={<Main/>} />
            <Route path="/enterSignature" element={<Signature/>} />
            <Route path="/Vote" element={<Vote/>}/>
    </Routes>
    </Router>
    </div>
    
    )

  return (
    <div>
        {layout}
    </div>
  );
}
}