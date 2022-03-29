import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import web3config from 'config/web3';
import WEB3 from 'config/web3';
import BasketType from 'types/basketType';

import Baskets from '../../backend/abis/Baskets.json';
import Bread from '../../backend/abis/Bread.json';

class BasketsService {
    static web3Options = { transactionConfirmationBlocks: 1 };

    static UndefinedAccountError = new Error('Account is not defined');

    web3: Web3;

    breadContract: Contract;

    basketsContract: Contract;

    account: {
        address: string
    };

    constructor(
      web3Provider: any = web3config.DEFAULT_PROVIDER,
      chainId: number = web3config.DEFAULT_CHAIN_ID,
      account: { address: string } = { address: ' ' },
    ) {
      this.web3 = new Web3(web3Provider, undefined, BasketsService.web3Options);

      const breadNetworkData = Bread.networks[chainId];
      const basketsNetworkData = Baskets.networks[chainId];

      this.breadContract = new this.web3.eth.Contract(Bread.abi, breadNetworkData?.address);
      this.basketsContract = new this.web3.eth.Contract(Baskets.abi, basketsNetworkData?.address);
      this.account = account;
    }

    getBaskets = (): Promise<BasketType[]> => this.basketsContract.methods.getAllBaskets().call();

    createBasket = (
      domain: string,
      amount: any,
      price: any,
    ) => {
      if (!this.account?.address) throw (BasketsService.UndefinedAccountError);

      return new Promise<BasketType>((resolve, reject) => this.breadContract.methods.approve(this.basketsContract.address, amount)
        .send({ from: this.account.address })
        .on('confirmation', () => this.basketsContract.methods
          .createBasket(domain, amount, price)
          .send({ from: this.account.address })
          .on('confirmation', resolve)
          .on('error', reject))
        .on('error', reject));
    };

    getBasket = (domain: string): Promise<BasketType> => {
      if (!this.account?.address) throw (BasketsService.UndefinedAccountError);

      return this.basketsContract.methods.getBasket(domain).call({ from: this.account.address });
    }

    updateBasket = (
      domain: string,
      amount: any,
      price: any,
    ) => new Promise<BasketType>((resolve, reject) => {
      if (!this.account?.address) throw (BasketsService.UndefinedAccountError);

      return this.breadContract.methods.approve(this.basketsContract.address, amount)
        .send({ from: this.account.address })
        .on('confirmation', () => this.basketsContract.methods
          .updateBasket(domain, amount, price)
          .send({ from: this.account.address })
          .on('confirmation', resolve)
          .on('error', reject))
        .on('error', reject);
    });

    deleteBasket = (
      domain: string,
    ) => {
      if (!this.account?.address) throw (BasketsService.UndefinedAccountError);

      return new Promise<boolean>((resolve, reject) => this.basketsContract.methods.deleteBasket(domain)
        .send({ from: this.account.address })
        .on('confirmation', resolve)
        .on('error', reject));
    };
}

export default new BasketsService();
export const basketServiceOnServer = new BasketsService(WEB3.DEFAULT_SERVER_PROVIDER);

export {
  BasketsService,
};
