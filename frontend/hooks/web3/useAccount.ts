import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import { connector } from 'config/web3';

interface Account {
  address?: string,
  active: boolean,
  chainId?: number,
  login: Function,
  logout: Function,
  isLoading: boolean,
  error?: Error,
}

const useAccount = (): Account => {
  const {
    account, active, activate, deactivate, chainId, error,
  } = useWeb3React();

  const address = account || undefined;
  const isLoading = false;

  const login = useCallback(async () => {
    console.log('LOGIN');
    if (connector) activate(connector);
  }, [activate]);

  const logout = useCallback(async () => {
    deactivate();
  }, [deactivate]);

  return {
    address,
    active,
    chainId,
    login,
    logout,
    isLoading,
    error,
  };
};

export default useAccount;
