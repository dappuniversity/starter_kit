import useSWR, { SWRResponse } from 'swr';
import { Contract } from 'web3-eth-contract';

import { fromWei } from 'utils/web3';

import useBreadContract from './useBreadContract';

const useBreadBalance = (address?: string, suspense = false): number => {
  const breadContract: Contract | undefined = useBreadContract();

  const getBreadBalanceOf = () => breadContract?.methods.balanceOf(address).call();
  const shouldFetch = !!breadContract && !!address && typeof address === 'string';

  const result: SWRResponse = useSWR(
    shouldFetch ? ['breadBalance', address] : null,
    getBreadBalanceOf,
    { suspense },
  );

  const breadBalance = fromWei(result.data || 0);

  return breadBalance;
};

export default useBreadBalance;
