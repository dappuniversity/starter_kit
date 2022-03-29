import { useWeb3React } from '@web3-react/core';
import useSWR, { SWRResponse } from 'swr';

import { fromWei } from 'utils/web3';

const useEthBalance = (address?: string): number => {
  const { library: web3 } = useWeb3React();

  const getEthBalance = (_address: string) => web3.eth.getBalance(_address);

  const shouldFetch = !!web3 && !!address && typeof address === 'string';
  const result: SWRResponse = useSWR(
    shouldFetch ? [address, 'EthBalance'] : null,
    getEthBalance,
  );
  const ethBalance = fromWei(result.data || 0);

  return ethBalance;
};

export default useEthBalance;
