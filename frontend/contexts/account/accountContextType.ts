import AccountType from 'types/accountType';

type AccountContextType = {
  account?: AccountType,
  login: Function,
  logout: Function,
  isLoading: boolean,
  error?: Error,
}

export default AccountContextType;
