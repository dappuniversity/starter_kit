import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import Web3 from 'web3';

import WEB3 from 'config/web3';

import { Web3Context } from './web3Context';

const Web3Provider: FC = ({ children }) => {
  const options = useMemo(() => ({
    transactionConfirmationBlocks: 1,
  }), []);

  const initialWeb3 = new Web3(Web3.givenProvider || WEB3.DEFAULT_PROVIDER, undefined, options);
  const [web3, setWeb3] = useState<Web3>(initialWeb3);
  const [ethereum, setEthereum] = useState<any>();
  const [networkId, setNetworkId] = useState<number>();
  const [isLoading, setIsLoading] = useState<any>();

  const loadWeb3 = useCallback(async () => {
    setIsLoading(true);
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum, undefined, options);
        // await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider, undefined, options);
      } else {
        console.warn('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    } catch (error) {
      console.error();
    } finally {
      setIsLoading(false);
      setWeb3(window.web3);
      setNetworkId(await web3?.eth.net.getId());
      setEthereum(window.ethereum);
    }
  }, [options]);

  useEffect(() => {
    loadWeb3();
  }, [loadWeb3]);

  const contextValue = {
    web3,
    networkId,
    ethereum,
    isLoading,
  };

  return (
    <Web3Context.Provider
      value={ contextValue }
    >
      { children }
    </Web3Context.Provider>
  );
};

export default Web3Provider;
