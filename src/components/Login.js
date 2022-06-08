import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Axios from 'axios';
import { sha256 } from 'js-sha256';
import "./Login.css";
import Main from "./Main";
import App from "./App";
import Welcome from "./Welcome"
import Registration from "./Registration"

export default class Login extends React.Component {
  constructor() {
    super();
   
    this.state = {
        verified: false,
        username: "",
        password: "",
        goReg: false,
        currentMetaAccount: "",
        
    };
    this.doLogin = this.doLogin.bind(this);
    this.goRegister = this.goRegister.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkIfWalletIsConnected = this.checkIfWalletIsConnected.bind(this);
    this.connectWallet = this.connectWallet.bind(this);


}

async componentWillMount() {
  await this.checkIfWalletIsConnected()
}

 checkIfWalletIsConnected = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts)

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      this.setState({currentMetaAccount: account});
    } else {
      console.log("No authorized account found")
    }
  } catch (error) {
    console.log(error);
  }

  
}


 connectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected to ", accounts[0]);
    alert("Connected to " + accounts[0])
    this.setState({currentMetaAccount: accounts[0]});
    localStorage.setItem("metaAccount", accounts[0]);
    
  } catch (error) {
    console.log(error)
  }
}




goRegister(){
  console.log("func");
  this.setState({
    goReg: true,
  });
}


static isLogged() {
  let loginData = localStorage.getItem('login');
  loginData = JSON.parse(loginData);
  if (loginData !== null && loginData.login === true) {
      return true;
  }
  return false;
}
validateForm() {
  //return this.username.length > 0 && this.password.length > 0;
  return 1
}

handleSubmit(event) {
  event.preventDefault();
}

doLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
    Axios.get("http://localhost:8000/api/login/" + username + "/")
        .then(response => {
            console.log(response)
            if (password === response.data.password) {
              console.log(response.data)
              this.setState({signed: true,});
              //this.props.doLogin(response.data,this.state.admin, this.state.type);
              let loginData = {
                login: true,
                info: response.data,
              };
        
            loginData = JSON.stringify(loginData);
            localStorage.setItem('login', loginData);
    
            this.setState({
              username: JSON.parse(loginData).info.username,
            });
            } else {
                alert('Password is incorrect!');
            }
        })
        .catch((err => {
            console.log(err);
            if (err.response.status === 404) {

                alert('Username not found!');
            }
        }));
        
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
      <Form.Group size="lg" controlId="username">
        <Form.Label>Username</Form.Label>
        <input class="form-control form-control-lg" type="text" placeholder="Enter username" aria-label=".form-control-lg example" id="username" name="username"/>
      </Form.Group>
      <Form.Group size="lg" controlId="password">
        <Form.Label>Password</Form.Label>
        <input class="form-control form-control-lg" type="password" placeholder="Enter password" aria-label=".form-control-lg example" id="password" name="password"/>
      </Form.Group>

      {!this.state.currentMetaAccount  && (
          <Button variant="primary" block size="lg" type="button" onClick={this.connectWallet}>
            Connect Wallet
          </Button>
        )}
      <Button variant="primary" block size="lg" type="button" onClick={this.doLogin} disabled={!this.state.currentMetaAccount}>Submit</Button>
      <Button variant="secondary" block size="lg" type="button" onClick={this.goRegister}>
        Register for an account
     </Button>
    </Form>
    </div>
  </div>
    );

    
    if (this.state.goReg == true) {
      layout = (<div> <Registration /> </div>);
    }
    if (Login.isLogged() == true) {
      layout = (<div> <Main /> </div>);
    }
    
    return (
      <div>
     {layout} 
      </div>
    );
  }

};