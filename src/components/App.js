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
        <Login/>
      </div>
    );

  return (
    <div>
    {layout}
    </div>
  );
}
}
