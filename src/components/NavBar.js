import React, { Component } from 'react';

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
            </a>
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