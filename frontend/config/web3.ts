import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';

const WEB3 = {
  DEFAULT_PROVIDER: 'ws://localhost:8545',
  DEFAULT_SERVER_PROVIDER: 'ws://ganache:8545',
  DEFAULT_CHAIN_ID: 1337,
  DEPLOYER_PRIVATE_KEY: '0xf05cec14e21365f8ba190e586bd9e8c58f4eedbfadc06fa011244e727044174c', // Same as fist private key in deploy/docker/images/ganache/ganache.sh
  SUPPORTED_CHAIN_IDS: {
    ETHEREUM: 1,
    GANACHE_LOCAL: 1337,
  },
  SUPPORTED_CHAIN_NAMES: {
    1: 'Ethereum',
    1337: 'Ganache Local',
  },
};

const connector = new InjectedConnector({
  supportedChainIds: Object.values(WEB3.SUPPORTED_CHAIN_IDS),
});

const getWeb3Library = (provider: any, _connector: any) => new Web3(provider); // this will vary according to whether you use e.g. ethers or web3.js

export default WEB3;

export {
  connector,
  getWeb3Library,
};
