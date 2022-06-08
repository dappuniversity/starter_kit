

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Routes, Switch, Link, Route } from "react-router-dom";
import "./enterSignature.css";
import { create } from 'ipfs-http-client'




export default class Upload extends React.Component {
    constructor() {
        super();
        this.state = {
            existsonBC: false,
            ipfs: null,
            fileHash: null
        };

        this.ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });
        console.log(this.ipfs)
        this.onChain = this.onChain.bind(this);
        this.addFile = this.addFile.bind(this);

    }
    onChain() {
        this.setState({
            existsonBC: true,
        });
    }

    addFile = async () => {

        const file = document.getElementsByName('file')[0].files[0];
    
        if(file != undefined)
        {
          
            const get_file_array = (file) => {
                return new Promise((acc, err) => {
                    const reader = new FileReader();
                    reader.onload = (event) => { acc(event.target.result) };
                    reader.onerror = (err)  => { err(err) };
                    reader.readAsBinaryString(file);
                });
             }
    
            
            const data =  await get_file_array(file);
    
            console.log(data);
    
            const fileAdded = await this.ipfs.add(file);
            console.log(fileAdded);
            this.setState({fileHash: fileAdded.path});
            console.log(this.state.fileHash);

            console.log()
            
            const urlItemAdded = "https://ipfs.io/ipfs/" + this.state.fileHash

            console.log(urlItemAdded);

            localStorage.setItem("addedItemHash", urlItemAdded);

            window.location.href = '/Uploaded';
            
        }
        
        
        
    }
    
    

    render() {
        let layout = (
            
            <div className="main">

                <div className="Page">
                    <h1>Enter Signature</h1>
                    <p> You can add a signature on the CIDS using this platform. If the signature already exists in the chain, you will be redirected to voting.
                    </p>
                    <div className="Signature">
                        <br></br>
                        <label> Upload File </label>
                        <br></br>
                            <input type="file" name="file"></input>
                            <div className="formButton">
                                <Button block size="lg" type="submit" value="Submit" onClick={this.addFile}>
                                    Submit
                                </Button>
                            
                        </div>

                        <br></br>
                        <br></br>
                    </div>
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



