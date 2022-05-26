import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Switch, Link, Route} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import "./Main.css";
import Signature from "./upload"; //change this line to revert back to old signature page 
import Vote from "./Vote";
import Main from "./Main";
import Upload from "./upload";
import UploadSuccess from "./uploaded"
import Login from "./Login";

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
            <Link class="nav-link" to="/uploadSignature"> Add Signature </Link>
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
            <Route path="/uploadSignature" element={<Signature/>} />
            <Route path="/Vote" element={<Vote/>}/>
            <Route path="/uploadSignature" element={<Upload/>}/>
            <Route path="/Uploaded" element={<UploadSuccess/>} />
    </Routes>
    </Router>
    </div>
    
    )

  return (
    <div>
        <Login/>
    </div>
  );
}
}