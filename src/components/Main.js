import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Switch, Link, Route} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import "./Main.css";
import Signature from "./enterSignature";
import Vote from "./Vote";
import Upload from "./upload";
import UploadSuccess from "./uploaded"
import Welcome from "./Welcome"
import  { ethers } from "ethers"

export default class Main extends React.Component {
  
  constructor() {
    super();
    this.state = {
        enter: false,
        vote: false,
    };
    this.goEnter = this.goEnter.bind(this);
    this.goVote = this.goVote.bind(this);
    this.doLogout = this.doLogout.bind(this);
   
}


goEnter() {
  
    window.location.href = '/uploadSignature';
    return false;
}

goVote() {
 
  window.location.href = '/Vote';
  return false;
}


doLogout() {
  let user = JSON.parse(localStorage.getItem('login'));
  user.login = false;
  localStorage.setItem('login', JSON.stringify(user));
  
  window.location.href = '/';
}


  render() {
    let layout = (
      
    <div className="main">
      <Router>
      <div className="navbarMe">
    
            <nav class="navbar navbar-expand-sm bg-dark">
            <a class="navbar-brand" href="/">Collaborative Intrusion Detection Platform</a>
              <ul class="navbar-nav">
              
                <li class="nav-item">
                <Link class="nav-link" to="/"> Home </Link>
                </li>
                <li class="nav-item">
                <Link class="nav-link" to="/uploadSignature"> Add Signature </Link>
                </li>
                <li class="nav-item">
                <Link class="nav-link" to="/Vote"> Vote </Link>
                </li>

                <li class="nav-item" onClick={this.doLogout}><Link to="/logout" class="nav-link">  Logout   </Link> </li>
            
              </ul>
            </nav>
    
            </div>
    <Routes>
                <Route path="/" element={<Welcome/>} />
                
                <Route path="/Vote" element={<Vote/>}/>
                <Route path="/uploadSignature" element={<Upload/>}/>
                <Route path="/Uploaded" element={<UploadSuccess/>} />
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