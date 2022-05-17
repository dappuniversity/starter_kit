import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import "./Login.css";

export default class enterSignature extends React.Component {
  constructor() {
    super();
    this.state = {
        existsonBC: false,
    };
    this.onChain = this.onChain.bind(this);
}
  onChain(){
      this.setState({
        existsonBC: true,
    });
  }


  render () {
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
    <h1>Enter Signature</h1>
    <p> You can add a signature on the CIDS using this platform. If the signature already exists in the chain, you will be redirected to voting.
    </p>
    <div className="Signature">
    <form>
        <div class="form-group row">
            <label for="inputFeature1" class="col-sm-2 col-form-label">Feature 1</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="inputFeature1" placeholder="Feature 1"/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <label for="inputFeature2" class="col-sm-2 col-form-label">Feature 2</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="inputFeature2" placeholder="Feature 2"/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <label for="inputFeature3" class="col-sm-2 col-form-label">Feature 3</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="inputFeature3" placeholder="Feature 3"/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <label for="inputFeature4" class="col-sm-2 col-form-label">Feature 4</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="inputFeature4" placeholder="Feature 4"/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <label for="inputFeature5" class="col-sm-2 col-form-label">Feature 5</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="inputFeature5" placeholder="Feature 5"/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="formButton">
            <Button block size="lg" type="submit">
            Submit
            </Button>
            </div>
        </div>
    </form>
      
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