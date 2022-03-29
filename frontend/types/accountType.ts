type AccountType = {
    address?: string,
    active: boolean,
    chainId?: number,
    balances: {
      ether?: number,
      bread?: number,
    },
  }

export default AccountType;
