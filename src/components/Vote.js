import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Signatures from '../abis/Signatures.json'
import  { ethers } from "ethers"
import "./Vote.css";

export default class Vote extends React.Component  {


  constructor() {
    super();
    this.state = {
      contract: null,
      currentMetaAccount: "", 
      signatures: [],
    };
    this.state.currentMetaAccount = localStorage.getItem("metaAccount");
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
    this.getSignatures = this.getSignatures.bind(this);
    this.goVote = this.goVote.bind(this);
    
  
}

async componentWillMount() {
  await this.loadBlockchainData();
  await this.getSignatures();
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

getSignatures = async () => {
  const files = await this.state.contract.getFiles();
  let recArr = []
  files.forEach(file => {
    recArr.push({
      id: file.id.toNumber(),
      owner: file.owner,
      attackVote: file.attackVote.toNumber(),
      normalVote: file.normalVote.toNumber(),
      ipfsHash: file.ipfsHash,
    });
  })
  this.setState({signatures: recArr});
  console.log(this.state.signatures);
}

goVote = async (id, vote) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      console.log("This is goVote");
      console.log(this.state.contract);
      const voted = await this.state.contract.voteSignature(id, vote);
      console.log("Voting...");
    }
    else {
      console.log("Ethereum object doesn't exist!");
    }
  }
  catch (error) {
    console.log(error);
  }
}




  render () {

    return (
      <div className="main" id="content">
      <div className="Page">
      <h2>Vote Signatures</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Signature</th>
            <th scope="col">Votes</th>
            <th scope="col">Owner</th>
            <th scope="col"></th>
            <th scope="col">Vote</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        { this.state.signatures.map((file, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{file.id}</th>
              <td>Signature #{file.id+1}</td>
              <td>{file.normalVote} normal, {file.attackVote} malicious</td>
              <td>{file.owner}</td>
              <td><button className="downButton"><p><a href={"https://ipfs.io/ipfs/" + file.ipfsHash + "/"}>Download data</a></p></button></td>
              <td><button className="voteButton" type="submit" onClick={() => this.goVote(file.id, 0)}>Attack</button></td>
              <td><button className="voteButton" type="submit" onClick={() => this.goVote(file.id, 0)}>Normal</button></td>
              </tr>
              )
            })}
        </tbody>
      </table>
    </div>
    </div>
      );
    }
};

