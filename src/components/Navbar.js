import React, { Component } from 'react';
import './App.css';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href="https://phoenixdoge.fun/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Phoenix Doge DApp
                </a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <small className="text-white">
                            <p id="account" className="mb-0">{ this.props.account }</p>
                        </small>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;