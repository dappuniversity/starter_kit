import React, { useEffect, useState } from 'react';
import { useStore } from '../context/GlobalState'
import './App.css'

export const EthAccountInfo = () => {
    const [{ web3, accounts, web3LoadingErrorMessage, web3Loaded }] = useStore();
    const [accountBalance, setAccountBalance] = useState(0);


    useEffect(() => {
        (async () => {
            if (web3 && accounts[0]) {
                const balance = await web3.eth.getBalance(accounts[0]);
                setAccountBalance(web3.utils.fromWei(balance, "ether"));
            }
        })();
    }, [web3, accounts])

    function accountDisplay() {
        if (accounts && accounts[0]) {
            return (
                <div className="center">
                  <b>  <span>Address:</span><span>{accounts[0]}</span></b>
                    <br />
                 <b>   <span>Balance:</span><span>{accountBalance} ethers</span></b>
                </div>
            );
        }
        else if(!web3 && web3LoadingErrorMessage && !web3Loaded){
            return (
                <div style={{color:"red"}} > {web3LoadingErrorMessage} </div>
            )
        }
        else {
            return <div style={{color:"red"}}>Loading Web3 and Account Details</div>
        }
    }
    return (
        <div className= "eth-account-info-container">
            <div>Your Ethereum Account Details</div>
            <hr/>
            {
                accountDisplay()
            }
        </div>

    )

}