

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Routes, Switch, Link, Route } from "react-router-dom";
import "./enterSignature.css";
import { create } from 'ipfs-http-client'
import Signatures from '../abis/Signatures.json'
import  { ethers } from "ethers"





export default class Upload extends React.Component {
    constructor() {
        super();
        this.state = {
            existsonBC: false,
            ipfs: null,
            fileHash: null,
            currentMetaAccount: "", 
            contract: null,
        };

        this.state.ipfs =  create({ host: 'localhost', port: '5001', protocol: 'http' });
        this.state.currentMetaAccount = localStorage.getItem("metaAccount");
        console.log(this.state.ipfs)
        this.onChain = this.onChain.bind(this);
        this.addFile = this.addFile.bind(this);
        this.loadBlockchainData = this.loadBlockchainData.bind(this);

       
      

    }
    onChain() {
        this.setState({
            existsonBC: true,
        });
    }


    async componentWillMount() {
        await this.loadBlockchainData()
      }

    loadBlockchainData = async () => {
   
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const networkData = Signatures.networks[5777];
        const signatureContract = new ethers.Contract(networkData.address, Signatures.abi, signer);

        await this.setState({contract: signatureContract});

    }
    }
    

    addFile = async () =>  {

        

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
    
            const fileAdded = await this.state.ipfs.add(file);
            
            this.setState({fileHash: fileAdded.path});
            
            const urlItemAdded = "https://ipfs.io/ipfs/" + this.state.fileHash

            const files = await this.state.contract.getFiles();

            //console.log(files[0].id.toNumber());

            localStorage.setItem("addedItemHash", urlItemAdded);

            const waveTxn = await this.state.contract.addNewSignature(this.state.fileHash);
            console.log("Mining...", waveTxn.hash);

            await waveTxn.wait();
            console.log("Mined -- ", waveTxn.hash);

    

            //window.location.href = '/Uploaded';

        
            
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



