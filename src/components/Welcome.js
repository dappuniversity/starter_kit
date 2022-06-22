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
import Main from "./Main";

export default class Welcome extends React.Component {

  constructor() {
    super();
    this.state = {
        enter: false,
        vote: false,
    };
    this.goEnter = this.goEnter.bind(this);
    this.goVote = this.goVote.bind(this);
}

goEnter() {
  
    window.location.href = '/uploadSignature';
}

goVote() {
 
  window.location.href = '/Vote';
}

  render() {
    let layout = (
      
    <div className="main">
  
    <div className="Main">
        <center>
        <h1> Welcome </h1>
        <p> Welcome to the Collaborative Intrusion Detection System.</p>
        <p> You can add or browse signatures.</p>
        </center>
        <Button block size="lg" type="submit" onClick={this.goEnter}>
          Enter a malicious activity
        </Button>
        <Button block size="lg" type="submit" onClick={this.goVote}>
          Vote network activities
       </Button>
    </div>
    </div>
    
    )
  
  return (
    
    <div>
        {layout}
    </div>

  );
}
}