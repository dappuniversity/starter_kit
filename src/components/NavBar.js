import React, { Component } from 'react';

import styled from 'styled-components';

const MarketplaceName = styled.h1`
    font-family: 'Permanent Marker', cursive;
    color: rgb(70,130,180);
`;

const EthPrice = styled.div`
    color: white;
`;

class NavBar extends Component {
  
    render() {
      return (
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
              className="navbar-brand col-sm-3 col-md-2 mr-0"
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            >
              CRYPTOBASE
              <MarketplaceName>Marketplace</MarketplaceName></a>
              <EthPrice><img src={this.props.ethLogo} height='30'alt='Eth Logo' />Eth: ${this.props.ethPrice} </EthPrice>
          <ul className='navbar-nav px-3'>
            <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
                {this.props.account 
                    ? <small className='text-white'><span id='account'>🟢 User Account: {this.props.account}</span></small>
                    : <small className='text-white'><span id='account'>User Account: Not Connected</span></small>
                }
            </li>
          </ul>
          </nav>
        </div>
      );
    }
  }
  
  export default NavBar;