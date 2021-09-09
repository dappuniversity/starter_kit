import React, { Component } from 'react';
import logo from '../PhoenixDoge.jpg';

class Main extends Component {
    render() {
        return(
            <div id="content" className="mt-3">
                <table className="table table-borderless text-muted text-center">
                    <thead>
                        <tr>
                            <th scope="col">PhoenixDoge Wallet Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')} PhoenixDoge</td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="card-deck">
                    <img src={ logo } alt="Logo" width="150"/>
                    <div className="card my-auto">
                        <div className="card-body">
                            <button
                                type="submit" 
                                className="btn btn-warning btn-block"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.props.claimBNB();
                                }}
                            >
                                CLAIM BNB
                            </button>
                        </div>
                    </div>  
                </div>
            </div>    
        );
    }
}

export default Main;