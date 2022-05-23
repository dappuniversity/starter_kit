import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import {BrowserRouter as Router, Routes, Switch, Link, Route} from "react-router-dom";
import "./enterSignature.css";

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

    <div className="Page">
    <h1>Enter Signature</h1>
    <p> You can add a signature on the CIDS using this platform. If the signature already exists in the chain, you will be redirected to voting.
    </p>
    <div className="Signature">
    <form>
        <div class="form-group row">
            <label for="inputFeature1" class="col-sm-2 col-form-label">Duration</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="duration" placeholder="length (number of seconds) of the connection"/>
            </div>
            <br></br>
            <br></br>
            <label for="inputFeature2" class="col-sm-2 col-form-label">Protocol Type</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="protocol_type" placeholder="type of the protocol, e.g. tcp, udp, etc."/>
            </div>
            <br></br>
            <br></br>
            <label for="inputFeature3" class="col-sm-2 col-form-label">Service</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="service" placeholder="network service on the destination, e.g., http, telnet, etc."/>
            </div>
            <br></br>
            <br></br>
            <label for="inputFeature4" class="col-sm-2 col-form-label">Source Bytes</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="src_bytes" placeholder="number of data bytes from source to destination"/>
            </div>
            <br></br>
            <br></br>
            <label for="inputFeature5" class="col-sm-2 col-form-label">Destination Bytes</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="dst_bytes" placeholder="number of data bytes from destination to source "/>
            </div>
            <br></br>
            <br></br>
            <label for="inputFeature5" class="col-sm-2 col-form-label">Flag</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="flag" placeholder="normal or error status of the connection"/>
            </div>
            <br></br>
            <br></br>
            <label for="inputFeature5" class="col-sm-2 col-form-label">Land</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="land" placeholder="1 if connection is from/to the same host/port; 0 otherwise"/>
            </div>
            <br></br>
            <br></br>
            <label for="inputFeature5" class="col-sm-2 col-form-label">Wrong Fragment</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="wrong_fragment" placeholder="number of wrong fragments"/>
            </div>
            <br></br>
            <br></br>
            <label for="inputFeature5" class="col-sm-2 col-form-label">Urgent</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="urgent" placeholder="number of urgent packets"/>
            </div>
            <br></br>
            <br></br>
            <label for="inputFeature5" class="col-sm-2 col-form-label">Flag</label>
            <div class="col-sm-10">
            <input type="feature" class="form-control" id="flag" placeholder="normal or error status of the connection"/>
            </div>
            <br></br>
            <br></br>
             <div className="formButton">
              <Button block size="lg" type="submit" value = "Submit">
              Submit
              </Button>
              </div>
            <br></br>
            <br></br>
        </div>
    </form>
      
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