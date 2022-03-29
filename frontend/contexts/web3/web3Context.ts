import { createContext, useContext } from 'react';

import Web3ContextType from './web3ContextType';

const defaultState = {
  web3: undefined,
  ethereum: undefined,
  isLoading: false,
  login: () => { },
};

const Web3Context = createContext<Web3ContextType>(defaultState);

const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3Context must be used within a Web3Provider');
  }
  return context;
};

export default useWeb3Context;
export {
  Web3Context,
};
