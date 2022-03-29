import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'web3-eth-contract';

const useContract = (contractJson: any): Contract | undefined => {
  const { library: web3, chainId } = useWeb3React();
  const [contract, setContract] = useState<Contract>();

  const getContract = useCallback(() => {
    if (web3 && chainId) {
      const networkData = contractJson.networks[chainId];
      const contractAddress = networkData?.address;

      if (networkData) {
        const _contract = new web3.eth.Contract(contractJson.abi, contractAddress);
        setContract(_contract);
      }
    }
  }, [web3, chainId, contractJson]);

  useEffect(() => {
    getContract();
  }, [getContract, web3, chainId]);

  return contract;
};

export default useContract;
