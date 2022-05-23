

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Routes, Switch, Link, Route } from "react-router-dom";
import "./enterSignature.css";
import { create } from 'ipfs-http-client'







export default class ipfsTest extends React.Component {
    constructor() {
        super();
        this.state = {
            existsonBC: false,
            ipfs: null
        };
        this.ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });
        this.onChain = this.onChain.bind(this);
        this.addFile = this.addFile.bind(this);
    }
    onChain() {
        this.setState({
            existsonBC: true,
        });
    }

    addFile() {

        const fileName = document.getElementsByName('fileName')[0].value
        console.log(fileName)
        const fileN = document.getElementsByName('file')[0].files[0].name;
        console.log(fileN)
    
        const filePath = "files/" + fileN
        console.log(filePath)
    
        const reader = new window.FileReader();
        const file = reader.readAsArrayBuffer(filePath);
        console.log(file)
        
        const fileAdded = await this.ipfs.add({ path: fileName, content: file });
        const fileHash = fileAdded[0].hash;
    
        return fileHash;
    }
    
    



    render() {
        let layout = (
            
            <div className="main">

                <div className="Page">
                    <h1>Enter Signature</h1>
                    <p> You can add a signature on the CIDS using this platform. If the signature already exists in the chain, you will be redirected to voting.
                    </p>
                    <div className="Signature">

                        <label>Filename</label>
                        <input type="text" name="fileName"></input>
                        <br></br>
                        <label> Upload File </label>
                        <div class="col-sm-10">
                            <input type="file" name="file"></input>
                            <div className="formButton">
                                <Button block size="lg" type="submit" value="Submit" onClick={this.addFile}>
                                    Submit
                                </Button>
                            </div>
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



