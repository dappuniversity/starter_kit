import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import "./Main.css";
import Signature from "./enterSignature";
import Vote from "./Vote";

export default class Main extends React.Component {

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
    this.setState({
        enter: true,
    });
}

goVote() {
  this.setState({
      vote: true,
  });
}

  render() {
    let layout = (
    <div className="main">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="./"
          target="_blank"
          rel="noopener noreferrer"
        >
          Collaborative Intrusion Detection Platform
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{}</span></small>
          </li>
        </ul>
      </nav>
    
    <div className="Main">
        <h1 className="Header">Welcome</h1>
        <Button block size="lg" type="submit" onClick={this.goEnter}>
          Enter a malicious activity
        </Button>
        <Button block size="lg" type="submit" onClick={this.goVote}>
          Vote network activities
       </Button>
    </div>
    </div>
    )

    if (this.state.enter === true) {
      layout = (

          <div>
              <Signature/>
          </div>
      );
  }

  if (this.state.vote === true) {
    layout = (

        <div>
            <Vote/>
        </div>
    );
}
  
  return (
    <div>
        {layout}
    </div>
  );
}
}