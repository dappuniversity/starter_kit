

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Routes, Switch, Link, Route } from "react-router-dom";
import "./enterSignature.css";



export default class UploadSuccess extends React.Component {
    constructor() {
        super();
        this.state = {
            existsonBC: false,
            link: null
        };
       
      
        this.onChain = this.onChain.bind(this);
        this.link = localStorage.getItem("addedItemHash");
        localStorage.removeItem("addedItemHash");
        console.log(this.link)
        

    }
    onChain() {
        this.setState({
            existsonBC: true,
        });
    }


    

    render() {
        let layout = (

            <div className="main">
                <br></br>
                <br></br>
                <br></br>
                <div className="Page">
                    <h1> File Uploaded! </h1>
                    <p> Link: <a href={this.link}> Click Here </a></p>
                </div>
            </div>

        );
        return (
            <div>
                {layout}
            
            </div>
        );
    }
};




