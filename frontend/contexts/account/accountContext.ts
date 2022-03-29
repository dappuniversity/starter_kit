import { Context } from 'react';

import { createContext } from 'utils/context';

import AccountContextType from './accountContextType';

const CONTEXT_NAME = 'Account';

const defaultState = {
  account: undefined,
  loggedOut: undefined,
  login: () => {},
  disabled: false,
  isLoading: false,
};

const {
  Context: AccountContext,
  useContext: useAccountContext,
}: {
  Context: Context<AccountContextType>,
  useContext: Function,
} = createContext(CONTEXT_NAME, defaultState);

export default useAccountContext;
export {
  AccountContext,
};
