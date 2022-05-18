import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import "./Vote.css";

export default class Vote extends React.Component  {
    toggle() {
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }


  render () {
    let layout = (
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
            </tr>
          </thead>
          <tbody id="productList">
            <tr>
              <th scope="row">1</th>
              <td>Signature #1</td>
              <td>5 safe 1 malicious</td>
              <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
              <td><button className="downButton">Download data</button></td>
              <td><button className="voteButton">Vote</button></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Signature #2</td>
              <td>3 safe 2 malicious</td>
              <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
              <td><button className="downButton">Download data</button></td>
              <td><button className="voteButton">Vote</button></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Signature #3</td>
              <td>0 safe 2 malicious</td>
              <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
              <td><button className="downButton">Download data</button></td>
              <td><button className="voteButton">Vote</button></td>
            </tr>
          </tbody>
        </table>
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