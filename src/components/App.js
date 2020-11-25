import React, { Component } from 'react';
import Web3 from 'web3';
import axios from "axios";
// import logo from '../logo.png';
// import './App.css';
import Marketplace from '../abis/Marketplace.json';
import NavBar from './NavBar';
import Main from './Main';

import styled from 'styled-components';

const Whole = styled.section`
  background: rgba(70,130,180,1);
`;

const Loading = styled.div`
  margin-top: 10%;
`;

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    // console.log(window.web3)

    axios
      .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => {
          console.log(res.data[1])
          this.setState({ ethPrice: res.data[1].current_price})
          this.setState({ ethLogo: res.data[1].image})
      })
      .catch(err => console.log(err));
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.eth_requestAccounts
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })

      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount })

      // Load Products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false })
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true, 
      ethPrice: 0,
      ethLogo: ''
    }
    this.createProduct = this.createProduct
    this.purchaseProduct = this.purchaseProduct
  }
  

  createProduct(name, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false})
    })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false})
    })
  }

  render() {
    return (
      <div>
        <Whole>
          <NavBar 
            account={this.state.account} 
            ethPrice={this.state.ethPrice} 
            ethLogo={this.state.ethLogo}
          />
          <div className='container-fluid mt-5'>
            <div className='row'>
              <main role='main' className='col-lg-12 d-flex'>
                {this.state.loading 
                  ? <Loading id='loader' className='text-center'><p className='text-center'>loading...</p></Loading>
                  : <Main 
                    products={this.state.products} 
                    createProduct={this.createProduct}
                    purchaseProduct={this.purchaseProduct} /> 
                }
              </main>
            </div>
          </div>
        </Whole>
      </div>
    );
  }
}

export default App;
