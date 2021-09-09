import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Main from './Main';
import Web3 from 'web3';
import PhoenixDogeOfficialB from '../abis/PhoenixDogeOfficialB.json';
import Token from './Token';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('No ethereum browser is installed. Try it installing MetaMask.');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
	
    // Cargar cuenta
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // Recoger contrato del Token
    const token = await new web3.eth.Contract(PhoenixDogeOfficialB.abi, Token.address);
    this.setState({ token });

    let tokenBalance = await token.methods.balanceOf(this.state.account).call();
    this.setState({ tokenBalance: tokenBalance.toString() });
    
    this.setState({ loading: false });
  }

  claimBNB = () => {
    this.setState({ loading: true });

    this.state.token.methods.ClaimBNB().send({ from: this.state.account })
    .on('confirmation', (confirmationNumber) => {
      this.setState({ loading: false });
      window.location.reload();
    });
  } 

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      token: {},
      tokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content;
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main 
        tokenBalance={ this.state.tokenBalance }
        claimBNB={ this.claimBNB }
      />
    }

    return (
      <div>
        <Navbar account={ this.state.account } />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
