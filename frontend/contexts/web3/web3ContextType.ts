import Web3 from 'web3';

interface Web3ContextType {
  web3?: Web3,
  networkId?: number,
  ethereum?: any,
  isLoading: boolean,
  login: Function,
}

export default Web3ContextType;
