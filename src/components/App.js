import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import { useState, useEffect } from "react";
import Web3 from "web3";
import bankImage from "../bank.png";
import { Button, Row } from "react-bootstrap";
import TetherTokenAbi from "../abis/TetherToken.json";

const App = (props) => {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("0x0");
  const [tetherTokenContract, setTetherTokenContract] = useState({});
  const [tetherBalance, setTetherBalance] = useState(0);
  const [rewardTokenContract, setRewardTokenContract] = useState({});
  const [dBankContract, setDBankContract] = useState({});
  const [stakingBalance, setStakingBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadWeb3 = async () => {
    if (!window.ethereum && !window.web3) {
      window.alert("No Ethereum browser detected. Install Metamask.");
    }
    const web3 = new Web3(window.ethereum);
    setWeb3(web3);

    const web3Accounts = await web3.eth.getAccounts();
    console.log(web3Accounts);
    setAccount(web3Accounts[0]);
  };

  const loadBlockchainData = async () => {
    const networkId = await web3.eth.net.getId();
    const tetherNetworkData = TetherTokenAbi.networks[networkId];
    console.log("token network ID: ", networkId);

    //load contracts
    if (tetherNetworkData) {
      const tetherContract = new web3.eth.Contract(
        TetherTokenAbi,
        tetherNetworkData.address
      );

      setTetherTokenContract(tetherContract);
      let tetherBalance = await tetherTokenContract.methods
        .balanceOf(account)
        .call();

      setTetherBalance(tetherBalance);
    } else {
      window.alert(
        "Error - Tether contract not deployed - no network detected"
      );
    }
  };

  // const checkWalletIsConnected = async () => {};

  const connectWalletHandler = async () => {};

  const connectWalletButton = async () => {};

  useEffect(() => {
    (async () => {
      await loadWeb3();
    })();

    return () => {};
  }, []);

  const navBar = () => {
    const titleString = "\t\t DAPP Yield Farming Decentralized Banking";

    const imageElement = (
      <img
        src={bankImage}
        width="50"
        height="30"
        className="d-inline-block align-top"
        alt="bank"
      />
    );

    return (
      <Navbar title={titleString} image={imageElement} account={account} />
    );
  };

  return (
    <div>
      <Row>{navBar()}</Row>
      <br />
      <br />
      <Row style={{ position: "relative" }}>
        <Button variant="outline-dark">Click Me</Button>
      </Row>
      <Row>
        <Button variant="outline-dark">Click Me2</Button>
      </Row>
    </div>
  );
};

export default App;
