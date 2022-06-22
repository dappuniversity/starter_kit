import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Axios from 'axios';
import { sha256 } from 'js-sha256';
import "./Login.css";
import Login from "./Login"

export default class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
        verified: false,
        username: "",
        password: "",
        goLog: false,
    };
    this.doRegister = this.doRegister.bind(this);
    this.goLogin = this.goLogin.bind(this);
}

goLogin(){
    this.setState({
        goLog: true,
    })
}
doRegister() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    var customer = {
        "username": username,
        "password": password,
    }
    this.setState({
        goCode:true,
        customer:customer,
    });
    Axios.post("http://localhost:8000/api/login/", customer)
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                alert("Registeration Successful")
            }
            this.setState({verified:true})

        }, (error) => {
            console.log(error);
            if (error.response.status === 400) {
                alert(error.response.data);
            }
        });
}

  render() {
    let loginData = localStorage.getItem('login');
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
    
  <div className="Login">
  
    <Form>
    <p>Enter the information below for registration.</p>
      <Form.Group size="lg" controlId="username">
        <Form.Label>Username</Form.Label>
        <input class="form-control form-control-lg" type="text" placeholder="Enter username" aria-label=".form-control-lg example" id="username" name="username"/>
      </Form.Group>
      <Form.Group size="lg" controlId="password">
        <Form.Label>Password</Form.Label>
        <input class="form-control form-control-lg" type="password" placeholder="Enter password" aria-label=".form-control-lg example" id="password" name="password"/>
      </Form.Group>
      
      <Button variant="primary" block size="lg" type="button" onClick={this.doRegister}>Register</Button>
      <Button variant="secondary" block size="lg" type="button" onClick={this.goLogin}>
        Go To Sign In Page
     </Button>
    </Form>
    </div>
  </div>
    );
    if (this.state.verified == true || this.state.goLog == true) {
        layout = (<div><Login /></div>)
    }
    return (
      <div>
     {layout} 
      </div>
    );
  }

};