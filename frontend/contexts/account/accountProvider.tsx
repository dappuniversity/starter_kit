import { FC } from 'react';

import {
  useAccount,
  useBreadBalance,
  useEthBalance,
} from 'hooks/web3';

import { AccountContext } from './accountContext';
import AccountContextType from './accountContextType';

const AccountProvider: FC = ({ children }) => {
  const {
    address, active, chainId, login, logout, isLoading, error,
  } = useAccount();
  const ether = useEthBalance(address);
  const bread = useBreadBalance(address);

  const contextValue: AccountContextType = {
    account: {
      address,
      active,
      chainId,
      balances: {
        ether,
        bread,
      },
    },
    login,
    logout,
    isLoading,
    error,
  };

  return (
    <AccountContext.Provider
      value={ contextValue }
    >
      { children }
    </AccountContext.Provider>
  );
};

export default AccountProvider;
