import React, { useEffect, useState } from "react";
import Web3 from "web3";

import Token from "../abis/Token.json";
import EthSwap from "../abis/EthSwap.json";

import Navbar from "./Navbar";
import Main from "./Main";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    account: "",
    ethBalance: "0",
    token: {},
    tokenBalance: "0",
    ethSwap: {},
    isLoading: true,
    hash: "",
  });

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();
  }, [state.hash]);

  const loadBlockchainData = async () => {
    const account = (await window.web3.eth.getAccounts())[0];
    const ethBalance = await window.web3.eth.getBalance(account);
    const networkId = await window.web3.eth.net.getId();

    //Load token data
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const token = new window.web3.eth.Contract(Token.abi, tokenData.address);
      const tokenBalance = await token.methods.balanceOf(account).call();
      setState((prev) => ({
        ...prev,
        account,
        ethBalance,
        token,
        tokenBalance: tokenBalance.toString(),
      }));
    } else {
      window.alert("Token contract not deployed to detected network");
    }
    //Load ethSwap data
    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwap = new window.web3.eth.Contract(
        EthSwap.abi,
        ethSwapData.address
      );
      setState((prev) => ({
        ...prev,
        account,
        ethBalance,
        ethSwap,
        isLoading: false,
      }));
    } else {
      window.alert("EthSwap contract not deployed to detected network");
    }
  };
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Your browser does not support ethereum");
    }
  };

  const buyTokens = (etherAmount) => {
    state.ethSwap.methods
      .buyTokens()
      .send({ value: etherAmount, from: state.account })
      .on("transactionHash", (hash) => {
        setState((prev) => ({ ...prev, isLoading: false, hash }));
      });
    setState((prev) => ({ ...prev, isLoading: true }));
  };

  const sellTokens = (tokenAmount) => {
    setState({ ...state, loading: true });
    state.token.methods
      .approve(state.ethSwap.address, tokenAmount)
      .send({ from: state.account })
      .on("transactionHash", (hash) => {
        state.ethSwap.methods
          .sellTokens(tokenAmount)
          .send({ from: state.account })
          .on("transactionHash", (hash) => {
            setState({ ...state, loading: false });
          });
      });
  };

  let content;
  if (state.isLoading) {
    content = (
      <p id="loader" className="text-center">
        Loading...
      </p>
    );
  } else {
    content = (
      <Main
        ethBalance={state.ethBalance}
        tokenBalance={state.tokenBalance}
        buyTokens={buyTokens}
        sellTokens={sellTokens}
      />
    );
  }
  return (
    <div>
      <Navbar account={state.account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 d-flex ml-auto mr-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
              {content}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
